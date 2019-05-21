var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get(`/hello`, function(req, res) {
  res.sendfile("files/hello_javascript.html");
})

app.get(`/consolelog`, function(req, res) {
  res.sendfile("files/consolelog.html");
})

app.get(`/button`, function(req, res) {
  res.sendfile("files/button_click.html");
})

app.get(`/alert`, function(req, res) {
  res.sendfile("files/alert.html");
})

app.get(`/sum`, function(req, res) {
  res.sendfile("files/sum.html");
})

console.log("running")
