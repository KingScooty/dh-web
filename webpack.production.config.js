var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

// var outDirectory = (process.env.NODE_ENV === 'production') ?
//   'dist' :
//   'build';

// Multiple entry and output points? One for server and one for client?

module.exports = {
  entry: [
    './src/client.js'
  ],
  resolve: {
    modules: [
      'node_modules'
    ],
    // modulesDirectories: ['node_modules', 'shared'],
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'dist/static/'),
    filename: 'client.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel']
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader'])
        // loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader', 'sass-loader')
        // loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
        // loader: ExtractTextPlugin.extract('!sass-loader!postcss-loader')
        // loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader!postcss-loader')
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([
      {
        // context: path.join(__dirname, 'src'),
        flatten: true,
        from: path.join(__dirname, 'src/**/images/**/*'),
        to: path.join(__dirname, 'dist/static/images/')
      },
      {
        context: `${__dirname}/src/`,
        flatten: true,
        from: '**/*.svg',
        to: path.join(__dirname, 'dist/static/svg/')
      }
    ]),
    new ExtractTextPlugin('css/main.css', {allChunks: false}),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    new webpack.optimize.DedupePlugin(),
    new OptimizeCssAssetsPlugin({
      // cssProcessorOptions: {
      //   mergeRules: false,
      //   discardDuplicates: false
      // }
    })
    // new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/)
  ],
  postcss: function () {
    return [autoprefixer];
  },
  devtool: 'sourcemap'
};
