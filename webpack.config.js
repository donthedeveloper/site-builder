const path = require('path');

module.exports = {
  entry: ['./browser/src/react-redux/index.js'],
  mode: 'development',
  module: {
    rules: [{
      test: /js?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    }],
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    path: path.join(__dirname, 'browser/public/js'),
    filename: 'scripts.js',
  },
  devtool: 'source-map',
};
