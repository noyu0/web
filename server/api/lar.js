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
    console.log(err.sqlMessage)
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
  add: 'insert into ID(userid, password, identity) values(?,?,"用户")',
  get: 'select * from ID'
}

// POST 请求
router.post('/addID', (req, res) => {
  const params = req.body
  db.query(sqlMap.add, [params.userid, params.password], (err, result) => {
    callbackResult(res, result, err)
  })
})

// GET 请求
router.get('/getID', (req, res) => {
  const params = req.query
  db.query(sqlMap.get, [params.userid, params.password, params.identity], (err, result) => {
    callbackResult(res, result, err)
  })
})

module.exports = router
