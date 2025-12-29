const http = require('http')
var express = require('express');
const path = require('path');
var app = express();
const PORT = process.env.PORT || 3010;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use('/', express.static(path.join(__dirname), {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

const appController = require('./controllers/appController.js');
app.use('/', appController);



app.listen(PORT, "127.0.0.1", () => {
  console.log("Servidor escuchando en puerto", PORT);
});
