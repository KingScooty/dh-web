var path = require('path');

// var outDirectory = (process.env.NODE_ENV === 'production') ?
//   'dist' :
//   'build';

module.exports = {
  entry: [
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
        exclude: /node_modules/,
        loaders: ['babel']
      }
    ]
  }
};
