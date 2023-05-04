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
  add: 'insert into log(name, remarks,price,amount) values(?,?,?,0)',
  get: 'select * from log',
  getamount: 'select amount from log where name = ?',
  update: 'update log set amount = ? where name = ?'
}

// POST 请求
router.post('/addlog', (req, res) => {
  const params = req.body
  db.query(sqlMap.add, [params.name, params.remarks, params.price, params.amount], (err, result) => {
    callbackResult(res, result, err)
  })
})

router.post('/updatelog', (req, res) => {
  const params = req.body
  db.query(sqlMap.update, [params.amount, params.name], (err, result) => {
    callbackResult(res, result, err)
  })
})

// DELETE 请求
router.get('/getlog', (req, res) => {
  const params = req.body
  db.query(sqlMap.get, [params.name, params.remarks, params.price, params.amount], (err, result) => {
    callbackResult(res, result, err)
  })
})

router.get('/getamount', (req, res) => {
  const params = req.body
  db.query(sqlMap.getamount, [params.name], (err, result) => {
    callbackResult(res, result, err)
  })
})

module.exports = router
