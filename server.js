const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
  response.sendFile(__dirname + './public/index.html');
});

//for getting a single exchanges book from the database
//right now there is only 'poloniex_book' and 'bittrex_book'
app.get('/api/v1/:book', (request, response) => {
  const { book } = request.params
  database(book).select()
    .then( bookInfo => response.status(200).json({ bookInfo }) )
    .catch( error => response.status(500).json({ error }) );
});

app.get('/api/v1/all-books', (request, response) => {
  database('bittrex_book').select()
    .then( bitInfo => {
      database('poloniex_book').select()
        .then( poloInfo => Object.assign({}, { bittrex_book: bitInfo }, { poloniex_book: poloInfo }) )
        .then( books => response.status(200).json(books))
        .catch( error => response.status(500).json({ error }))
    })
});

app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => {
  console.log(`Orderbooks is running on ${app.get('port')}.`);
});