var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get(`/`, function(req, res) {
  res.sendfile("files/review.html");
})

app.get(`/review`, function(req, res) {

  var input = Number(req.query.input);

  console.log(input);

  var itemList = [
    {name: "item1", price: 1000},
    {name: "item2", price: 5000},
    {name: "item3", price: 10000},
    {name: "item4", price: 30000},
    {name: "item5", price: 50000},
    {name: "item6", price: 100000},
    {name: "item7", price: 500000},
  ];

  var resultText = "구매 불가";

  for (var i = 0; i < itemList.length; i++) {
    if (input >= itemList[i].price) {
      resultText = itemList[i].name;
    }
  }

  res.send(resultText);
})

app.get(`/box`, function(req, res) {
  res.sendfile("files/select_box.html");
})

app.get(`/box2`, function(req, res) {
  res.sendfile("files/select_box2.html");
})

app.get(`/carbuy`, function(req, res) {

  var carKindsIndex = Number(req.query.kinds);
  var carColorIndex = Number(req.query.color);

  var carKinds = [
    {name: "현대", price: 2100},
    {name: "기아", price: 1300},
    {name: "쌍용", price: 1500},
    {name: "벤츠", price: 3500},
    {name: "BMW", price: 3200}
  ];
  var carColor = [
    {name: "빨강", price: 100},
    {name: "파랑", price: 120},
    {name: "초록", price: 200},
    {name: "노랑", price: 130},
    {name: "검정", price: 80}
  ];

  var resultCarKinds = carKinds[carKindsIndex].price;

  var resultCarKindsName = carKinds[carKindsIndex].name;
  var resultCarColor = carColor[carColorIndex].price;
  var resultCarColorName = carColor[carColorIndex].name;

  var result = resultCarKindsName + " + " + resultCarColorName + " = " + (resultCarKinds + resultCarColor) + "만원";

  res.send(result);
})

app.get(`/function`, function(req, res) {
  res.sendfile("files/function_practice.html");
})


console.log("running");
