var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get(`/practice`, function(req, res) {
  res.sendfile("files/practice_middle_test.html");
})

app.get(`/test`, function(req, res) {
  res.sendfile("files/middle_test.html");
})

console.log("running")
