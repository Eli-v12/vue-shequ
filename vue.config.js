module.exports = {
  devServer: {
    proxy: {
      "/api": {
        //使用 api 来代替 http
        // 这个是代理的地方，源地址
        target: "https://vue-js.com/api/v1",
        ws: true, //缓存
        changeOrigin: true, //改变源
        // 路径重写 axios 用 /api 发请求，然后就把 /api 设置为空， 就指到 target: "https://vue-js.com/api/v1",
        pathRewrite: {
          "^/api": "", //路径重写
        },
      },
    },
  },
};
