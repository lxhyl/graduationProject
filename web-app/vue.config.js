module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  devServer: {
    port: 6010,
    proxy: {
      "/bsapi": {
        ws: false,
        target: "http://127.0.0.1:6100",
        changeOrigin: true,
        pathRewrite: {
          "^/bsapi": "/"
        }
      }
    }
  }
};
