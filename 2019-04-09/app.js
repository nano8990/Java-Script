var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get(`/array`, function(req, res) {
  res.sendfile("files/array_practice.html");
})

console.log("running")
