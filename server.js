const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'build')));


app.set('port', process.env.PORT || 3001);
app.set('secretKey', process.env.SECRET_KEY);

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/build/index.html`, (err, file) => {
    response.send(file);
  });
});

// Middleware for Authentication

const checkAuth = (request, response, next) => {
  const token = request.headers.authorization || request.query.token || request.body.token;

  if (!token) {
    return response.status(403).json({ error: 'You must be authorized to access this endpoint.' });
  } else {
    jwt.verify(token, app.get('secretKey'), (error, decoded) => {
      if (error) {
        return response.status(403).json({ error: 'Invalid token.' });
      }
      if (decoded) {
        if (decoded.admin) {
          return next();
        }
        return response.status(403).json({ error: 'You must be authorized to access this endpoint.' });
      }
    });
  }
}

// Endpoints

app.post('/api/v1/user/authenticate', (request, response) => {
  const { email, password } = request.body;
  let user;
  if (!email || !password) {
    return response.status(422).json({
      error: 'You are missing a required parameter. Please include both email address and password.'
    });
  }
  const emailSuffix = email.split('@')[1];

  if (emailSuffix === 'shapeshift.io') {
    user = Object.assign({}, request.body, { admin: true });
  } else {
    user = Object.assign({}, request.body, { admin: false });
  }

  const token = jwt.sign(user, app.get('secretKey'), { expiresIn: '48h' });
  response.status(201).json({ token });
});

app.get('/api/v1/book/:exchange_book', (request, response) => {
  const { exchange_book } = request.params
  database(`${exchange_book}`).select()
    .then( bookInfo => {
      if (!bookInfo) {
        return response.status(404).json({ error: 'There is no exchange given as a parameter.  Please be sure you entered the parameter and that it is in the correct format: \'exchange_book\'.' });
      }
      return response.status(200).json( bookInfo ) 
    })
    .catch( error => response.status(500).json({ error }) );
});

app.get('/api/v1/all-books', (request, response) => {
  database('bittrex_book').select()
    .then( bitPrices => {
      database('poloniex_book').select()
        .then( poPrices => Object.assign({}, { bittrex_book: bitPrices }, { poloniex_book: poPrices }) )
        .then( books => response.status(200).json(books) )
        .catch( error => response.status(500).json({ error }) );
    });
});

app.delete('/api/v1/:exchange_book/:id', checkAuth, (request, response) => {
  const { exchange_book, id } = request.params;

  database(`${exchange_book}`).where({ id }).del()
    .then( deleted => {
      if (!deleted) {
        return response.status(404).json({ error: `A row with the id of ${id} could not be found in the table.` });
      }
     return response.sendStatus(204);
    })
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/:exchange_book', checkAuth, (request, response) => {
  const { exchange_book } = request.params;
  const bookObject = request.body;

  for (let requiredParameter of [
    'bid_volume',
    'bid',
    'ask',
    'ask_volume'
  ]) {
    if (!bookObject[requiredParameter]) {
      return response.status(422)
                     .send({
                       error: `Expected format: { bid_volume: <String>, bid: <String>, ask: <String>, ask_volume: <String> }.  You're missing a ${requiredParameter} property.`
                     });
    }
  }

  database(`${exchange_book}`).insert(bookObject, '*')
    .then( priceData => response.status(201).json(priceData) )
    .catch( error => response.status(500).json({ error }) );
});

app.patch('/api/v1/:exchange_book/:id', checkAuth, (request, response) => {
  const { exchange_book, id } = request.params;
  const {
    bid_volume,
    bid,
    ask,
    ask_volume
  } = request.body;

  if (!bid_volume && !bid && !ask && !ask_volume) {
    return response.status(422).send({
      error: 'Expected format: { bid_volume: <String>, bid: <String>, ask: <String>, ask_volume: <String> }.  You\'re missing a valid property.'
    })

  database(`${exchange_book}`).where({ id })
    .update({
      bid_volume,
      bid,
      ask,
      ask_volume
    }, '*')
    .then( update => response.status(200).json(update) )
    .catch( error => response.status(500).json({ error }) );
  }
});

app.listen(app.get('port'), () => {
  console.log(`Orderbooks is running on ${app.get('port')}.`);
});

module.exports = app;