var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql')

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'webui'
});

app.get(`/`, function(req, res) {
  res.sendfile('files/flight_main.html');
});

app.get(`/input_flight`, function(req, res) {
  res.sendfile('files/flight_flight.html');
});

app.get(`/input_aircraft`, function(req, res) {
  res.sendfile('files/flight_aircraft.html');
});

app.post(`/flight_send`, function(req, res) {
  var flightName = req.body.flightName;
  var aircraftCode = req.body.aircraftCode;
  var departure = req.body.departure;
  var arrival = req.body.arrival;
  var departureTime = req.body.departureTime;
  var arrivalTime = req.body.arrivalTime;

  if (flightName == '' || aircraftCode == '' || departure == '' || arrival == '' || departureTime == '' || arrivalTime == '') {
    res.send("EMPTY_VALUE");
  }
  var insertQuery = `INSERT INTO flight(flightName, aircraftCode, departure, arrival, departureTime, arrivalTime) VALUES ('${flightName}', '${aircraftCode}', '${departure}', '${arrival}', '${departureTime}', '${arrivalTime}')`;
  connection.query(insertQuery,
    function(err, rows, fields) {
      if (err) {
        res.send("PRIMARY_ERROR");
      }
      res.send("SUCCESS");
    }
  );
});

app.post(`/aircraft_send`, function(req, res) {
  var aircraftCode = req.body.aircraftCode;
  var aircraftName = req.body.aircraftName;
  var seats = req.body.seats;

  if (aircraftCode == '' || aircraftName == '' || seats == '') {
    res.send("EMPTY_VALUE");
  }
  var insertQuery = `INSERT INTO aircraft(aircraftCode, aircraftName, seats) VALUES ('${aircraftCode}', '${aircraftName}', '${seats}')`;
  connection.query(insertQuery,
    function(err, rows, fields) {
      if (err) {
        res.send("PRIMARY_ERROR");
      }
      res.send("SUCCESS");
    }
  );
});

app.post(`/select_flight`, function(req, res) {
  var tableName = req.body.tableName;
  var selectQuery = `select * from ${tableName}`;
  connection.query(selectQuery,
    function(err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.post(`/join_flight`, function(req, res) {
  var tableName1 = req.body.tableName1;
  var tableName2 = req.body.tableName2;
  var selectQuery = `select * from ${tableName1} T1, ${tableName2} T2 WHERE T1.aircraftCode = T2.aircraftCode`;
  connection.query(selectQuery,
    function(err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.post(`/delete_flight`, function(req, res) {
  var tableName = req.body.tableName;
  var deleteList = req.body.deleteList
  var primaryColumn;
  if (tableName == "flight") {
    primaryColumn = "flightName";
  } else if (tableName == "aircraft") {
    primaryColumn = "aircraftCode";
  }
  var whereCondition = "";
  for (var i = 0; i < deleteList.length; i++) {
    whereCondition += deleteList[i];
    if (i < deleteList.length - 1) {
      whereCondition += ", "
    }
  }
  var deleteQuery = `DELETE FROM ${tableName} WHERE ${primaryColumn} IN (${whereCondition})`;
  connection.query(deleteQuery,
    function(err, rows, fields) {
      if (err) throw err;
      res.send();
    }
  );
});

console.log('running');
