const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

const API_SERVICE_URL = "http://localhost:1234";

app.use('/api', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/api`]: '/',
    },
}));

app.listen(PORT, () => {
    console.log(`Proxy server listening at port number:${PORT}`);
});