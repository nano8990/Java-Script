var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get(`/`, function(req, res) {
  res.sendfile("files/js.html");
})

app.get(`/2/`, function(req, res) {
  res.sendfile("files/js2.html");
})

app.get(`/3/`, function(req, res) {
  res.sendfile("files/js3.html");
})

app.get(`/4/`, function(req, res) {
  res.sendfile("files/js4.html");
})

app.get(`/5/`, function(req, res) {
  res.sendfile("files/js5.html");
})

console.log("running")
