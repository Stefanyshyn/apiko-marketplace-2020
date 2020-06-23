const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = createProxyMiddleware({
  target: 'https://apiko-intensive-backend.herokuapp.com/',
  pathRewrite: {
    '^/api': '',
  },
  changeOrigin: true,
  ws: true,
});

const wsProxy = createProxyMiddleware({
  target: 'https://apiko-intensive-backend.herokuapp.com/',
  '^/api': '',
  changeOrigin: true,
  ws: true,
});

module.exports = (app) => {
  app.use('/api', proxy);
  app.use('/socket.io', wsProxy);
};
