const proxy = require('http-proxy-middleware');

module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://130.211.247.58:8088',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  transpileDependencies: [
    'vuetify'
  ]
}
