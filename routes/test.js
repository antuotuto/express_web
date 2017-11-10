var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  const sqlite3 = require('sqlite3').verbose();
  const db = new sqlite3.Database('test.db', (err) => {
    if (err) throw err;
  });

  let name = '--';
  console.log(name)

  db.serialize(() => {
    db.each("SELECT * FROM mytable", (err, row) => {
      console.log(row)
      name = row.value;
    }, (err, row) => {
      res.render('index', {
        title: name
      });
    });
  });

  db.close();
});


module.exports = router;