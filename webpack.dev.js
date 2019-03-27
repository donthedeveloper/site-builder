
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  resolve: {
    extensions: ['.js'],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'browser/dist'),
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/': 'http://localhost:3000',
    },
    port: 3001,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
