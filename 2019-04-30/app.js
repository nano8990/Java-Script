var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get(`/review`, function(req, res) {
  res.sendfile("files/review_and_jquery.html");
})

app.get(`/test`, function(req, res) {
  res.sendfile("files/jquery_test.html");
})

app.get(`/sum`, function(req, res) {
  var sum1 = Number(req.query.a);
  var sum2 = Number(req.query.b);
  var sum3 = Number(req.query.c);
  console.log(sum1 * sum2 * sum3)
  res.send(`multiply is ${sum1 * sum2 * sum3}`);
})

app.get(`/purchase`, function(req, res) {
  res.sendfile("files/purchase_item.html");
})

app.get(`/price`, function(req, res) {
  var comparePrice = Number(req.query.number);

  var priceTable = [
    {name: "item1", price: 1000},
    {name: "item2", price: 5000},
    {name: "item3", price: 10000},
    {name: "item4", price: 30000},
    {name: "item5", price: 50000},
    {name: "item6", price: 100000},
    {name: "item7", price: 500000}
  ];
  var result = "구입불가"
  for (var i = 0; i < priceTable.length; i++) {
    if (comparePrice >= priceTable[i].price) {
      result = priceTable[i].name;
    }
  }

  res.send(result);
});

console.log("running")
