let express = require('express');
let router = express.Router();
let mysql = require('mysql');

let db = require('../config/db');
let connection = mysql.createConnection(db);

let xss = require('xss');
let cookieParser = require('cookie-parser');
let csrf = require('csurf');
let bodyParser = require('body-parser');
let csrfProtection = csrf({ cookie: true });
let parseForm = bodyParser.urlencoded({ extended: false });


router.get('/', function(req, res) {
  res.json({ code: 200 })
});

// 博客信息

router.get('/blog-info', function(req, res) {
  connection.query('SELECT * FROM `blog_info`', function(err, rows) {
    res.json(rows[0]);
  });
});

// 个人信息
router.get('/my_info', function(req, res) {
  connection.query('SELECT * FROM `blog_myinfo`', function(err, rows) {
    res.json(rows);
  });
});

// Menu
router.get('/menu', function(req, res) {
  connection.query('SELECT * FROM `blog_menus`', function(err, rows) {
    res.json(rows);
  });
});

// 文章内容
router.get('/atticle', function(req, res) {
  if (req.query.id) {
    connection.query('SELECT * FROM `blog_atticle` WHERE `id` = ?', [req.query.id], (err, rows) => {
      res.json(rows[0]);
    });
  } else {
    connection.query('SELECT * FROM `blog_atticle`', function(err, rows) {
      res.json(rows);
    });
  }
});
// 留言 
router.get('/guestbook', function(req, res) {
  connection.query('SELECT * FROM `blog_guestbook` WHERE `atticleid` = ?', [req.query.id], (err, rows) => {
    res.json(rows);
  });
});

// 标签云 
router.get('/archive', function(req, res) {
  if (req.query.id) {
    connection.query('SELECT * FROM `blog_archive` WHERE `atticleid` = ?', [req.query.id], (err, rows) => {
      res.json(rows);
    });
  } else {
    connection.query('SELECT * FROM `blog_archive`', function(err, rows) {
      res.json(rows);
    });
  }
});

//插入留言

router.post('/inserguestbook', function(req, res) {
  var atticleid = req.body.guestbook.articleid,
    name = req.body.guestbook.username,
    email = req.body.guestbook.useremail,
    content = req.body.guestbook.content;
    console.log(req.body.guestbook)
    connection.query('INSERT INTO `blog_guestbook` (`atticleid`,`name`,`email`,`content`) VALUES (?,?,?,?)', [atticleid, name, email, content], (err, result) => {
      if (!err) {
        res.json({ code: 200 });
      }else{
         res.json({ code: 500 });
      }
    })
});
module.exports = router;
