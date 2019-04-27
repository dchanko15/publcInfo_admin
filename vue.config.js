module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/publicinfo/'
        : '/',
    devServer: {
        proxy:  'http://localhost:5000/'
    }
}
