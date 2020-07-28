const proxy = require('http-proxy-middleware');

// http://www.marketpayless.com//Products//QueryCommodityType?SortType=1&IsAsc=1&Page=1&FloatPageCount=10&ParentID
module.exports = function(app) {
  app.use(proxy('/api/fileUpload', {
    // target: 'http://www.marketpayless.com',
    // target: 'http://47.75.157.220:4464',
    target: 'http://localhost:4464',
    changeOrigin: true,
    pathRewrite: {
    }
  }));
  app.use(proxy('/Api', {
    // target: 'http://rap2api.taobao.org/app/mock/222495',
    // target: 'http://128.14.236.90:4433/mock/5d347e552b71b967c8c62b82/api/',
    // target: 'http://www.marketpayless.com',
    target: 'http://localhost:4464',
    changeOrigin: true,
    pathRewrite: {
      '^/Api': ''
    }
  }));
  app.use(proxy('/api', {
    // target: 'http://rap2api.taobao.org/app/mock/222495',
    // target: 'http://128.14.236.90:4433/mock/5d347e552b71b967c8c62b82/api/',
    // target: 'http://www.marketpayless.com',
    target: 'http://localhost:4464',
    changeOrigin: true,
    pathRewrite: {
    }
  }));
  app.use(proxy('/type__graphql/api', {
    // target: 'http://rap2api.taobao.org/app/mock/222495',
    // target: 'http://128.14.236.90:4433/mock/5d347e552b71b967c8c62b82/api/',
    // target: 'http://www.marketpayless.com',
    target: 'http://localhost:4464',
    changeOrigin: true,
    pathRewrite: {
    }
  }));
  app.use(proxy('/upload_file', {
    // target: 'http://rap2api.taobao.org/app/mock/222495',
    // target: 'http://128.14.236.90:4433/mock/5d347e552b71b967c8c62b82/api/',
    // target: 'http://www.marketpayless.com',
    target: 'http://47.75.157.220:4464',
    changeOrigin: true,
    pathRewrite: {
    }
  }));
};
