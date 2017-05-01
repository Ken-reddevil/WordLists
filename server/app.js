var express = require('express');
var app = express();
var Tesseract = require('tesseract.js');
var multer = require('multer');
var upload = multer({ dest: 'image/' });
var fs = require('fs');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/image', function(req, res) {
  res.send("Hello World");
})

app.post('/upload', upload.single('imgData'),function(req, res, next) {
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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});