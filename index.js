if (process.env.NODE_ENV === 'production') {
  // global.staticDir = path.resolve(__dirname)
  require('./dist/server');
}
else {
  require('babel-register')();
  require('babel-polyfill');
  require('./src/server');

  // we start a webpack-dev-server with our config
  let webpack = require('webpack');
  let WebpackDevServer = require('webpack-dev-server');
  let config = require('./webpack.config');

  const back_server = new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,
    proxy: {
      '**': 'http://localhost:3000'
    }
  });

  back_server.listen(3001, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Listening at localhost:3001');
  });
}
