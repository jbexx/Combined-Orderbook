const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/src/App.js');
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});