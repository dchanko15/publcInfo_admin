module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/publicinfoAdmin/'
        : '/publicinfoAdmin/',
    devServer: {
        proxy:  {
            '/publicinfoAdmin/api': {
                target: 'http://80.241.242.124/',
                changeOrigin: true
            },
            '/publicinfoAdmin/public': {
             /*   pathRewrite: {
                    '^/public': '/publicinfo-admin/public', // rewrite path
                },*/
                target: 'http://80.241.242.124/',
                changeOrigin: true
            },
        }
    }
}
