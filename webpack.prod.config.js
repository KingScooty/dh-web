var path = require('path');
var webpack = require('webpack');

// var outDirectory = (process.env.NODE_ENV === 'production') ?
//   'dist' :
//   'build';

// Multiple entry and output points? One for server and one for client?

module.exports = {
  entry: [
    'babel-polyfill',
    './src/client.js'
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'src/dist/'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel']
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/)
  ]
};
