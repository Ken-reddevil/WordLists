var lineReader = require('line-reader');
var mysql = require('mysql');

var db = mysql.createConnection({
    user: 'root',
    password: '', // your password
    database: 'words' // database name
});

db.connect(function(err) {
    if (err) {
        console.log(err);
    } else {
        lineReader.eachLine('CET46.csv', function (line, last) {
            var word = line.split(',')[0];
            var meaning = line.split(',')[1];
            var table = "CET46";
            var insert = "INSERT INTO " + table + " (word, meaning) VALUES(?, ?)";
            if (meaning) {
                meaning = meaning.replace(/\+/g, ";");
                meaning = meaning.replace(/\-/g, ",");
                db.query(insert, [word, meaning], function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
    }
});
