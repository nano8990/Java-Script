var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get(`/login`, function(req, res) {
  res.sendfile("files/login.html");
})

app.get(`/innerhtml/`, function(req, res) {
  res.sendfile("files/innerHTML.html");
})

app.get(`/gugudan/`, function(req, res) {
  res.sendfile("files/gugudan.html");
})

app.get(`/innerhtml2/`, function(req, res) {
  res.sendfile("files/innerHTML2.html");
})

console.log("running")
