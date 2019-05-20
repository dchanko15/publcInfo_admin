module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/publicinfo/'
        : '/',
    devServer: {
        proxy:  {
            '/publicinfo/api': {
                target: 'http://80.241.242.124/',
                changeOrigin: true
            },
            '/public': {
                pathRewrite: {
                    '^/public': '/publicinfo/public', // rewrite path
                },
                target: 'http://80.241.242.124/',
                changeOrigin: true
            },
        }
    }
}
