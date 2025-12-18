const http = require('http')
var express = require('express');
const path = require('path');
var app = express();
const hostname = '127.0.0.1'
const port = 3010

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

app.listen( port, hostname, () => {
    console.log(`Server runnint at https://${hostname}:${port}/`)
})