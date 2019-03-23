const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'browser/dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      appMountId: 'app',
      template: HtmlWebpackTemplate,
    }),
  ],
});
