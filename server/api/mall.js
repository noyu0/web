// api 实例
const express = require('express')
const mysql = require('mysql')
const models = require('../db')

const router = express.Router()
// 连接数据库
const db = mysql.createConnection(models.mysql)
db.connect()

const callbackResult = (res, result, err) => {
  if (err) {
    res.send({
      code: 500,
      msg: err.sqlMessage
    })
  };
  if (result) {
    res.send({
      code: 200,
      data: result
    })
  }
}
// ---------------------------以下部分根据需求自定义------------------------------
const sqlMap = { // sql语句
  // ? 占位符 后面给数据自动填充
  getGoods: 'select * from goods',
  getStationery: 'select * from stationery',
  getCart: 'select * from cart',
  getmyGoods: 'select * from mine',
  addCart: 'insert into cart(name, price) values(?,?)',
  addmyGoods: 'insert into mine(name, price) values(?,?)',
  delete: 'delete from cart where id = ?'
}

// GET 请求
router.get('/getGoods', (req, res) => {
  const params = req.query
  db.query(sqlMap.getGoods, [params.name, params.remarks, params.price], (err, result) => {
    callbackResult(res, result, err)
  })
})
router.get('/getStationery', (req, res) => {
  const params = req.query
  db.query(sqlMap.getStationery, [params.name, params.price], (err, result) => {
    callbackResult(res, result, err)
  })
})
router.get('/getCart', (req, res) => {
  const params = req.query
  db.query(sqlMap.getCart, [params.name, params.price], (err, result) => {
    callbackResult(res, result, err)
  })
})
router.get('/getmyGoods', (req, res) => {
  const params = req.query
  db.query(sqlMap.getmyGoods, [params.name, params.price], (err, result) => {
    callbackResult(res, result, err)
  })
})

router.post('/addCart', (req, res) => {
  const params = req.body
  db.query(sqlMap.addCart, [params.name, params.price], (err, result) => {
    callbackResult(res, result, err)
  })
})
router.post('/addmyGoods', (req, res) => {
  const params = req.body
  db.query(sqlMap.addmyGoods, [params.name, params.price], (err, result) => {
    callbackResult(res, result, err)
  })
})

router.post('/deleteCart', (req, res) => {
  const params = req.body
  db.query(sqlMap.delete, [params.id], (err, result) => {
    callbackResult(res, result, err)
  })
})

module.exports = router
