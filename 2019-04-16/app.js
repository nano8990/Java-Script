var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get(`/`, function(req, res) {
  res.sendfile("files/js.html");
})

app.get(`/0`, function(req, res) {
  res.sendfile("files/js0.html");
})

app.get(`/1`, function(req, res) {
  res.sendfile("files/js1.html");
})

console.log("running")
