'use strict';

const path = require('path');
const compress = require('koa-compress');
const morgan = require('koa-morgan');

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Router = require('react-router');
const RouterContext = Router.RouterContext;

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

// middleware
const Koa = require('koa');
const web = new Koa();

const logger = morgan('combined');
const serve = require('koa-static');
const minify = require('html-minifier').minify;

const routes = require('./routes');

web.use(serve(path.join(__dirname, 'dist')));

web.use(compress({
  flush: require('zlib').Z_SYNC_FLUSH
}));

web.use(logger);

const initialState = createStore(reducer);

web.use(function (ctx, next) {
  let appHtml;

  console.log('HELLO!!?!?!?!');
  console.log(initialState.getState());

  Router.match({
    routes: routes,
    location: ctx.url
  },
  (error, redirectLocation, renderProps) => {
    if (error) {
      ctx.throw(error.message, 500);
    }
    else if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search);
    }
    else if (renderProps) {
      appHtml = ReactDOMServer.renderToString(
        <Provider store={ initialState.getState() }>
          <RouterContext {...renderProps} />
        </Provider>);
      ctx.body = renderPage(appHtml);
    }
    else {
      ctx.throw('404, Page not found, bro', 404);
    }
    next();
  });
});

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

function renderPage(renderedBody) {
  let html = `<!doctype html>
      <html>
          <head>
              <meta charset="utf-8" />
              <title>{head.title}</title>
          </head>
          <body>
              <div id="app">${renderedBody}</div>

              <script charSet="utf-8" id="__INITIAL_STATE__" type="application/json">${safeStringify(initialState)}</script>

              <script src="/bundle.js"></script>
          </body>
      </html>`;

  // trim that whitespace
  return minify(html, {
    removeAttributeQuotes: true,
    collapseWhitespace: true
  });
}

module.exports = web;
