var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get(`/array`, function(req, res) {
  res.sendfile("files/array_practice.html");
})

app.get(`/dictionary`, function(req, res) {
  res.sendfile("files/dictionary_practice.html");
})

app.get(`/weightweight`, function(req, res) {
  res.sendfile("files/weight.html");
})

console.log("running")
