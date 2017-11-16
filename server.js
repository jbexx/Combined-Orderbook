//require express, a library that builds an abstraction on top of node that enhances readability and maintainability
const express = require('express');
// file system
const fs = require('fs');
const app = express();
const path = require('path');
// bodyParser is middleware that parses incoming request body from http
const bodyParser = require('body-parser');
// JSON Web Token - A way for securely transmitting information between parties as a JSON object
// has 3 parts - header - payload - signiture
// - header - usually is two parts, the type of token (JWT) and the algorithm being used for encoding
// - payload - contains the claims, statements about the entity (usually a user), like {admin: true}, name and email
// - signiture - used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.
//   signiture requires the encoded header, encoded payload, a secret key, and the algorithm
const jwt = require('jsonwebtoken');
// module that loads environment variables from .env file into process.env to allow for storing configuration in the environment instead of the code
require('dotenv').config();

// used to determine environment from prcess.env or if not specified use the 'development' environmnt
const environment = process.env.NODE_ENV || 'development';
// based on our environment, the database configuration is set by fetching it from the knexfile so that our app can connect to the DB
const configuration = require('./knexfile')[environment];
// bassed on the configuration, the database is set, i.e. test, production, development
const database = require('knex')(configuration);

app.use(bodyParser.json());
// urlencoded returns middleware that only parses urlencoded bodies
// extended: true is an option that parses data with the qs library, if false it uses the querystring library
// 'extended' allows for rich objects and arays to be encoded into the url encoded format for a more JSON like experience
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'build')));

// setting the port to whatever the environment is (like when on heroku, who knows what the PORT will be), or 3001
app.set('port', process.env.PORT || 3001);
// setting the secretKey from the .env file for the JWT
app.set('secretKey', process.env.SECRET_KEY);

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/build/index.html`, (err, file) => {
    response.send(file);
  });
});

// Middleware for Authentication

const checkAuth = (request, response, next) => {
  // this allows the JWT to come through the header, url, or the request body
  const token = request.headers.authorization || request.query.token || request.body.token;

  if (!token) {
    return response.status(403).json({ error: 'You must be authorized to access this endpoint.' });
  } else {
    // callback is supplied so acts asyncronously, the callback is called with the decoded payload if signiture is valid and not expired, if not it will be called with the error
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
// CRUD application - Create(post), Read/Retrieve(get), Update(put or patch), Destroy(delete)

// used to create JWT when user post their email and password
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

  // creates the token with the expiration option at 48 hours
  const token = jwt.sign(user, app.get('secretKey'), { expiresIn: '48h' });
  response.status(201).json({ token });
});

// get - Retrieve data from database
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

// delete - destroy data in database
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

// post - create data in database
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

// patch - update data in database (this is a partial update, use put for requiring all data parameters to be updated)
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