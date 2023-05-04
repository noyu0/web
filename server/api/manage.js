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
  editGoods: 'update goods set price = ?, inventory = ? where name = ?'
}

// POST 请求
router.post('/editGoods', (req, res) => {
  const params = req.body
  db.query(sqlMap.editGoods, [params.price, params.inventory, params.name], (err, result) => {
    callbackResult(res, result, err)
  })
})

module.exports = router
