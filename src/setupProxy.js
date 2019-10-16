const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', proxy({
    target: 'https://yuiapi.herokuapp.com/',
    changeOrigin: true,
  }));

  app.use('/auth', proxy({
    target: 'https://yuiapi.herokuapp.com/',
    changeOrigin: true,
  }));
};