module.exports = {
    entry: ['./browser/src/react-redux/index.react.js'],
    mode: 'development',
    module: {
        rules: [{
            test: /js?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    resolve: {
        extensions: ['.js']
    },
    output: {
        path: __dirname + '/browser/public/js',
        filename: 'scripts.js'
    },
    devtool: 'source-map'
};