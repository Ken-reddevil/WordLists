var express = require('express');
var app = express();
var Tesseract = require('tesseract.js');
var multer = require('multer');
var upload = multer({
  dest: 'image/'
});
var fs = require('fs');
var port = 3500;

var superagent = require('superagent');
var cheerio = require('cheerio');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/image', function (req, res) {
  res.send("Hello World");
})

app.post('/upload', upload.single('imgData'), function (req, res, next) {
  var path = req.file.path;
  Tesseract.recognize(path, {
      lang: 'eng'
    }).then(result => {
      res.send(result.text);
    })
    .catch(err => {
      console.log(err);
    })
});

app.get('/url', function (req, res) {
  var url = req.query.q;
  var result = {
    status: "error"
  };
  var text = "";
  superagent
    .get(url)
    .end(function (err, sres) {
      if (err) {
        res.json(result);
      } else {
        var $ = cheerio.load(sres.text);
        $('.story-body__inner p').each(function (idx, element) {
          element.children.forEach(value => {
            text += value.data;
            text += '\n';
          });
        });
        if (text != "") {
          result.text = text;
          result.status = "ok";
        }
        res.json(result);
      }
    });
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});