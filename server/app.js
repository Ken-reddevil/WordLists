var express = require('express');
var app = express();
var Tesseract = require('tesseract.js');
var multer = require('multer');
var upload = multer({
  dest: 'image/'
});
var fs = require('fs');

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
  var text = "";
  superagent.get(url)
    .end(function (err, sres) {
      var $ = cheerio.load(sres.text);
      $('.story-body__inner p').each(function (idx, element) {
        element.children.forEach(value => {
          text += value.data;
          text += '\n';
        })
      });
      res.send(text)
    })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});