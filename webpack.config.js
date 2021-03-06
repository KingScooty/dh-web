var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:3001/',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './src/client.js'
  ],
  output: {
    path: path.join(__dirname, '.temp/static/'),
    filename: 'client.js'
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    // modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel'] // ,
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        // loader: 'style-loader!css-loader!postcss-loader',
        // loaders: ['style', 'css', 'postcss', 'sass']
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      }
    ]
  },
  postcss: function () {
    return [autoprefixer];
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        context: `${__dirname}/src/`,
        flatten: true,
        from: '**/*.{png,jpg}',
        to: path.join(__dirname, '.temp/static/images/')
      },
      {
        context: `${__dirname}/src/`,
        flatten: true,
        from: '**/*.svg',
        to: path.join(__dirname, '.temp/static/svg/')
      }
    ]),
    new ExtractTextPlugin({
      filename: 'css/main.css',
      disable: false,
      allChunks: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/)
  ],
  devtool: 'inline-source-map',
  stats: {
    colors: true
  }
};
