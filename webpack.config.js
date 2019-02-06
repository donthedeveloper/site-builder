const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: ['./browser/src/react-redux/index.jsx'],
    mode: 'development',
    module: {
        rules: [
            {
                test: /jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, 'browser', 'public'),
        filename: 'scripts.js',
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'browser', 'public'),
        historyApiFallback: true,
        hot: true,
        proxy: {
            '/api': 'http://localhost:3000/api',
        },
        port: 3001,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};