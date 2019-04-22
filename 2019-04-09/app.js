var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get(`/`, function(req, res) {
  res.sendfile("files/js.html");
})

console.log("running")
