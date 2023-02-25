// node 后端服务器 (api部分可以根据需求自定义)
const express = require('express')
const bodyParser = require('body-parser')

// 引入模块api
const salesmanIDApi = require('./api/salesmanID')
const larApi = require('./api/lar')
const mallApi = require('./api/mall')
const manageApi = require('./api/manage')

const app = express()

// 解决跨域问题
app.all('*', function (req, res, next) {
  // 设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*')
  // 允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type')
  // 跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  if (req.method.toLowerCase() === 'options') {
    res.send(200) // 让options尝试请求快速结束
  } else {
    next()
  }
})
app.use(bodyParser.json()) // 以json格式返回出去
app.use(bodyParser.urlencoded({ extended: false }))

// 后端api路由
app.use('/salesmanID', salesmanIDApi)
app.use('/lar', larApi)
app.use('/mall', mallApi)
app.use('/manage', manageApi)

// 监听端口
app.listen(3000)
console.log('success listen at port:3000......')
