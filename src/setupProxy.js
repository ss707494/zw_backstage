const proxy = require('http-proxy-middleware');

// http://www.marketpayless.com//Products//QueryCommodityType?SortType=1&IsAsc=1&Page=1&FloatPageCount=10&ParentID
module.exports = function(app) {
  app.use(proxy('/Api', {
    // target: 'http://rap2api.taobao.org/app/mock/222495',
    target: 'http://www.marketpayless.com',
    changeOrigin: true,
    pathRewrite: {
      '^/Api': ''
    }
  }));
};
