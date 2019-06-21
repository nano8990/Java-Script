var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var request = require('request')
var mysql = require('mysql')

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host: '192.168.110.3',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'webui'
});

app.get(`/`, function(req, res) {
  res.sendfile('files/stock.html');
});

app.get(`/get_stock2`, function(req, res) {
  var itemList = {
    'skt':'017670',
    'kt':'030200',
    'lg':'003550',
    'hyundai':'005380',
    'kia':'000270'
  }
  var item = req.query.item
  var stockUrl = 'https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:'
  request.get(stockUrl + itemList.item, function(err, response, body) {
    body = JSON.parse(body);
    var price = body.result.areas[0].datas[0].nv;
    res.send(price + "");
  });
});

app.get(`/get_stock3`, function(req, res) {
  var selectQuery = `SELECT * FROM stock2`;

  connection.query(selectQuery,
    function(err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

console.log("running");
