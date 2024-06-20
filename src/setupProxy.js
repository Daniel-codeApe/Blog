import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app) {
    app.use(
        '/api', 
        createProxyMiddleware({
            target: 'http://localhost:3000/Blog',
            secure:false,
            changeOrigin: true
        })
    );
}