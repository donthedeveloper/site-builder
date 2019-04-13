
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

const filePath = path.join(__dirname, 'browser/dist');

module.exports = merge(common, {
  mode: 'development',
  resolve: {
    extensions: ['.js'],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: filePath,
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/': 'http://localhost:3000',
    },
    port: 3001,
    // eslint-disable-next-line no-shadow
    writeToDisk: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
