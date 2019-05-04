module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/publicinfo/'
        : '/',
    devServer: {
        proxy:  {
            '/Publicinfo/api': {
                target: 'http://172.16.30.12/',
                changeOrigin: true
            },
            '/public': {
                pathRewrite: {
                    '^/public': '/Publicinfo/public', // rewrite path
                },
                target: 'http://172.16.30.12/',
                changeOrigin: true
            },
        }
    }
}
