const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
  response.sendFile(__dirname + './public/index.html');
});



app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`Orderbooks is running on ${app.get('port')}.`);
});