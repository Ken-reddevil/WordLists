var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

var db = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'words'
});

router.get('/gaozhong', function(req, res) {

  var result = {
    status: "error"
  };

  var word = req.query.q;
  console.log(word);

  db.query("SELECT meaning FROM GAOZHONG WHERE word = ?", [word], function(err, row) {
    if (err || !row[0]) {
      db.query("SELECT meaning FROM CET46 WHERE word = ?", [word], function(err, row) {
        if (err || !row[0]) {
          db.query("SELECT meaning FROM TOEFL WHERE word = ?", [word], function(err, row) {
            if (err || !row[0]) {
              db.query("SELECT meaning FROM GRE WHERE word = ?", [word], function(err, row) {
                if (err || !row[0]) {
                  res.json(result);
                } else {
                  result.status = "ok";
                  result.meaning = row[0].meaning;
                  res.json(result);
                }
              });
            } else {
              result.status = "ok";
              result.meaning = row[0].meaning;
              res.json(result);
            }
          });
        } else {
          result.status = "ok";
          result.meaning = row[0].meaning;
          res.json(result);
        }
      });
    } else {
      result.status = "ok";
      result.meaning = row[0].meaning;
      res.json(result);
    }
  });
});

router.get('/gre', function(req, res) {

  var result = {
    status: "error"
  };

  var word = req.query.q;
  console.log(word);
  db.query("SELECT meaning FROM GRE WHERE word = ?", [word], function(err, row) {
    console.log(word);
    if (err) {
      res.json(result);
    } else {
      if (!row[0]) {
        res.json(result);
      } else {
        result.status = "ok";
        result.meaning = row[0].meaning;
        res.json(result);
      }
    }
  });
});

router.get('/toefl', function(req, res) {

  var result = {
    status: "error"
  };

  var word = req.query.q;
  console.log(word);

  db.query("SELECT meaning FROM TOEFL WHERE word = ?", [word], function(err, row) {
    if (err || !row[0]) {
      db.query("SELECT meaning FROM GRE WHERE word = ?", [word], function(err, row) {
        if (err || !row[0]) {
          res.json(result);
        } else {
          result.status = "ok";
          result.meaning = row[0].meaning;
          res.json(result);
        }
      });
    } else {
      result.status = "ok";
      result.meaning = row[0].meaning;
      res.json(result);
    }
  });
});
    
router.get('/cet', function(req, res) {

  var result = {
    status: "error"
  };

  var word = req.query.q;
  console.log(word);

  db.query("SELECT meaning FROM CET46 WHERE word = ?", [word], function(err, row) {
    if (err || !row[0]) {
      db.query("SELECT meaning FROM TOEFL WHERE word = ?", [word], function(err, row) {
        if (err || !row[0]) {
          db.query("SELECT meaning FROM GRE WHERE word = ?", [word], function(err, row) {
            if (err || !row[0]) {
              res.json(result);
            } else {
              result.status = "ok";
              result.meaning = row[0].meaning;
              res.json(result);
            }
          });
        } else {
          result.status = "ok";
          result.meaning = row[0].meaning;
          res.json(result);
        }
      });
    } else {
      result.status = "ok";
      result.meaning = row[0].meaning;
      res.json(result);
    }
  });
});

module.exports = router;
