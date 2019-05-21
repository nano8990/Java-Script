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

app.get(`/form`, function(req, res) {
  res.sendfile("files/form.html");
});

app.post(`/select`, function(req, res) {
  var no = req.body.no;
  var title = req.body.title;
  var text = req.body.text;
  var selectQuery = `select * from news`;
  var selectQueryValue = '';
  if (no != '') {
    selectQueryValue += `no=${no}`;
  }
  if (title != '') {
    if (selectQueryValue != '') {
      selectQueryValue += ' && ';
      selectQueryValue += `title="${title}"`;
    } else {
      selectQueryValue += `title="${title}"`;
    }
  }
  if (text != '') {
    if (selectQueryValue != '') {
      selectQueryValue += ' && ';
      selectQueryValue += `text="${text}"`;
    } else {
      selectQueryValue += `text="${text}"`;
    }
  }
  var finalSelectQuery;
  if (selectQueryValue != '') {
    finalSelectQuery = selectQuery + ' where ' + selectQueryValue;
  } else {
    finalSelectQuery = selectQuery
  }
  connection.query(finalSelectQuery,
    function(err, rows, fields) {
      if (err) throw err;
      var resultSend = '';
      res.send(rows);
    }
  );
});

app.post(`/insert`, function(req, res) {
  var inputTitle = req.body.title;
  var inputText = req.body.text;
  var selectQuery = 'SELECT * FROM news';
  connection.query(selectQuery,
    function(err, rows, fields) {
      if (err) throw err;
      var selectResult = rows;
      var no;
      if (selectResult != '') {
        no = selectResult[selectResult.length - 1].no + 1;
        for (var i = 0; i < selectResult.length; i++) {
          if (selectResult[i].no != (i + 1)) {
            no = (i + 1);
            break;
          }
        }
      } else {
        no = 1;
      }

      if (inputTitle == '') {
        inputTitle = 'NULL';
      } else if (inputTitle == undefined) {
        inputTitle = 'NULL';
      }

      if (inputText == '') {
        inputText = 'NULL';
      } else if (inputText == undefined) {
        inputText = 'NULL';
      }

      var insertQuery = `INSERT INTO news(no, title, text) VALUES `;
      var insertQueryValue = `(${no}, "${inputTitle}", "${inputText}")`
      var finalInsertQuery = insertQuery + insertQueryValue

      connection.query(finalInsertQuery,
        function(err, rows, fields) {
          if (err) throw err;
        }
      );
    }
  );
  res.send();
});

app.post(`/delete`, function(req, res) {
  var inputNumber = req.body.no;
  if (inputNumber != undefined) {
    var deleteQuery = 'DELETE FROM news WHERE no=';
    var finalDeleteQuery;
    for (var i = 0; i < inputNumber.length; i++) {
      finalDeleteQuery = deleteQuery + inputNumber[i]
      connection.query(finalDeleteQuery,
        function(err, rows, fields) {
          if (err) throw err;
        }
      );
    }
  }
  res.send();
});



console.log("running");
