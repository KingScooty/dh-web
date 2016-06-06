'use strict';

const path = require('path');
const compress = require('koa-compress');
const morgan = require('koa-morgan');

// middleware
const Koa = require('koa');
const web = new Koa();

const logger = morgan('combined');
// const serve = require('koa-static');
// const minify = require('html-minifier').minify;

// const routes = require('./routes');

web.use(compress({
  flush: require('zlib').Z_SYNC_FLUSH
}));

// web.use(serve(path.join(__dirname, 'dist')));
// web.use(serve(path.join(__dirname, 'static')));

var staticCache = require('koa-static-cache');

// web.use(staticCache(path.join(__dirname, 'dist'), {
//   maxAge: 365 * 24 * 60 * 60
// }));
web.use(staticCache(path.join(__dirname, 'static'), {
  maxAge: 365 * 24 * 60 * 60
}));

// web.use(staticCache('/dist/static'), {
//   maxAge: 365 * 24 * 60 * 60
// });

console.log(process.cwd());
console.log(process.env.PWD);
console.log(path.resolve('./'));
console.log(require.main);
console.log((path.join(__dirname, 'static')));

console.log(__filename);

web.use(logger);

import renderReactComponents from './lib/reactRender';
web.use(renderReactComponents);

module.exports = web;
