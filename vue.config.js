// eslint-disable-next-line no-undef
module.exports = {
  devServer: {
    port: 8080,
    host: 'localhost',
    https: false,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },

};
