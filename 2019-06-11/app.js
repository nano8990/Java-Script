var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var request = require('request')

app.get(`/`, function(req, res) {
  res.sendfile('files/stock.html');
});

app.get(`/get_stock`, function(req, res) {
  var itemList = {
    skt: '017670',
    kt: '030200',
    lg: '003550',
    hyundai: '005380',
    kia: '000270'
  }
  var item = req.query.item
  var stockUrl = 'https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:'
  request.get(stockUrl + itemList[item], function(err, response, body) {
    body = JSON.parse(body);
    var price = body.result.areas[0].datas[0].nv;
    res.send(price + "");
  });
});

console.log('running');
