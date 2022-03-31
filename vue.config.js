const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer:{
    proxy: {
      '^/api1': {  //匹配所有以/api 开头的请求路径
        target: 'http://localhost:8888',  //代理目标的基础路径
        ws: true,   //支持webSocket的功能的
        pathRewrite:{"^/api1":""},   //表示路径重写，这样代理服务器请求服务器就不会带有/api的请求
        changeOrigin: true  //开启路径欺骗，会根据请求的端口变化端口
      },
      //可以配置多个代理路径
      '/api2': {
        target: 'http://localhost:8888',  //代理目标的基础路径
        ws: true,   //支持webSocket的功能的
        pathRewrite:{"^/api2":""},   //表示路径重写，这样代理服务器请求服务器就不会带有/api的请求
        changeOrigin: true  //开启路径欺骗，会根据请求的端口变化端口
      }
    }
  }
})
