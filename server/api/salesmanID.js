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
  add: 'insert into ID(userid, password, identity) values(?,?,"销售人员")',
  get: 'select * from ID where identity = "销售人员"',
  update: 'update ID set userid = ?, password = ? where userid = ?',
  delete: 'delete from ID where userid = ?'
}

// POST 请求
router.post('/addID', (req, res) => {
  const params = req.body
  db.query(sqlMap.add, [params.userid, params.password], (err, result) => {
    callbackResult(res, result, err)
  })
})

// DELETE 请求
router.post('/deleteID', (req, res) => {
  const params = req.body
  db.query(sqlMap.delete, [params.userid], (err, result) => {
    callbackResult(res, result, err)
  })
})

// PUT 请求
router.put('/updateID', (req, res) => {
  const params = req.body
  db.query(sqlMap.update, [params.userid, params.password, params.id], (err, result) => {
    callbackResult(res, result, err)
  })
})

// GET 请求
router.get('/getID', (req, res) => {
  const params = req.query
  db.query(sqlMap.get, [params.userid, params.password], (err, result) => {
    callbackResult(res, result, err)
  })
})

module.exports = router
