const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

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
        path: path.resolve(__dirname, 'browser/public'),
        filename: 'scripts.js',
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'browser/public'),
        historyApiFallback: true,
        hot: true,
        proxy: {
            '/': 'http://localhost:3000',
        },
        port: 3001,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'browser', 'src', 'index.html')
        }),
        new CleanWebpackPlugin(['public/*.*'])

    ]
};