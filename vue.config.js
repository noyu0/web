const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const path = require('path')// 引入path模块
function resolve (dir) {
  return path.join(__dirname, dir)// path.join(__dirname)设置绝对路径
}

module.exports = {
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('components', resolve('./src/components'))
      .set('assets', resolve('./src/assets'))
      .set('views', resolve('./src/views'))
      .set('store', resolve('./src/store'))
    // set第一个参数：设置的别名，第二个参数：设置的路径
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 服务器协议、ip和端口号
        secure: false, // 如果是https接口，需要配置这个参数
        ws: true, // 是否代理websockets
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
