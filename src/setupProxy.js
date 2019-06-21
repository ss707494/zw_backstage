const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/Api', {
    target: 'http://rap2api.taobao.org/app/mock/222495',
    changeOrigin: true,
    pathRewrite: {
      '^/Api': '/'
    }
  }));
};
