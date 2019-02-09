const path = require('path');

module.exports = {
<<<<<<< HEAD
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
=======
  entry: ['./browser/src/react-redux/index.jsx'],
  mode: 'development',
  module: {
    rules: [{
      test: /jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, '/browser/public/js'),
    filename: 'scripts.js',
  },
  devtool: 'source-map',
};
>>>>>>> master
