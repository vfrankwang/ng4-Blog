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
// GETtoken
router.get('/gettoken', csrfProtection, function(req, res) {
  res.json({ csrfToken: req.csrfToken() })
});
// 查询商品列表 
router.get('/goods', function(req, res, next) {
  if (!req.body.gclass || req.body.gclass == '') {
    connection.query('SELECT * FROM `goods` order by id desc', function(err, rows) {
      if (err) {
        console.log(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    connection.query('SELECT * FROM `goods` WHERE `gclass` = ?', [req.body.gclass], function(err, rows) {
      if (err) {
        console.log(err);
      } else {
        res.json(rows);
      }
    });
  }
});

/*查询关系表函数*/

async function relevance(uid) {
  return await new Promise(resolve => {
    connection.query('SELECT * FROM `ugconn` WHERE `uid` = ?', [uid], (err, rows) => {
      resolve(rows);
    });
  });
}

async function goods(gid) {
  return await new Promise(resolve => {
    connection.query('SELECT * FROM `goods` WHERE `id` = ?', [gid], function(err, rows) {
      resolve(rows);
    });
  });
}

router.get('/cart', function(req, res, next) {
  req.body.user = 2;
  relevance(req.body.user).then((goodlist) => {
    let Goods = [];
    goodlist.forEach((item, index) => {
      Goods[index] = {};
      Goods[index].id = item.gid;
      Goods[index].number = item.number;
    });
    const promises = Goods.map(function(Good) {
      return goods(Good.id);
    });
    Promise.all(promises).then(function(value) {
      value.forEach((item, index) => {
        Goods[index].name = item[0].name;
        Goods[index].img = item[0].img;
        Goods[index].price = item[0].price;
        Goods[index].introduction = item[0].introduction;
        Goods[index].gclass = item[0].gclass;
      });
      res.json(Goods);
    })
  });
});

// 插入购物车 
router.post('/insert', csrfProtection, function(req, res) {
  let gid = xss(req.body.gid),
    uid = xss(req.body.uid)
  connection.query('INSERT INTO `ugconn` (`gid`,`uid`) VALUES (?,?)', [gid, uid], function(err, result) {
    if (!err) {
      res.json({ code: 200 });
    }
  })
});


module.exports = router;
