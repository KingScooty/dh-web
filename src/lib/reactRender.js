'use strict';

// React
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext, createMemoryHistory } from 'react-router';
import { routerReducer } from 'react-router-redux';

// minify breaks if use import
const minify = require('html-minifier').minify;

// Redux
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';

import routes from '../routes';
import * as actions from '../actions';

const store = createStore(
  combineReducers({
    events: reducer,
    routing: routerReducer
  }),
  {},
  applyMiddleware(thunkMiddleware)
);
// applyMiddleware(thunkMiddleware)(createStore)(reducer);

// Private:

// Match url in context against our routes
const matchRoutes = async (context) => {
  const history = createMemoryHistory();
  return new Promise((resolve, reject) => {
    // We will see what the routes factory returns below

    // Don't pass dispatch into router on server to prevent fetching twice.
    // const { dispatch } = store;
    const router = routes(history);
    const location = context.url;

    match({ routes: router, location }, (error, redirectLocation, renderProps) => {
      if (error) {
        // Unable to match any route
        reject(error);
      }
      else {
        // Route matched
        const path = context.path.slice(1);
        // console.log(location);

        // console.log('redirectlocation', redirectLocation);
        // console.log('renderPRops', renderProps);

        if (redirectLocation) {
          console.log('redirect location:', redirectLocation);
          resolve({ redirectLocation, renderProps });
        }
        else {
          store.dispatch(actions.fetchEventIfNeeded(path))
          .then(() => {
            resolve({ redirectLocation, renderProps });
          });
        }

        // fetchData(context, renderProps).then(() => {
        //   resolve({ redirectLocation, renderProps });
        // });
      }
    });
  });
};

const handleError = async (context, error) => {
  console.error(error.stack);
  context.status = 500;
  context.body = 'Something went wrong. Plrease try again later.';
};

const handleRedirect = async (context, location) => {
  const {pathname, search} = location;
  context.redirect(pathname + search);
};

const safeStringify = (obj) => {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
};

const renderBody = (context, renderProps) => {
  const body = renderToString(
    <Provider store={ store }>
      <RouterContext {...renderProps} />
    </Provider>
  );

  const initialState = store.getState();

  const html = `<!DOCTYPE html>
  <html class="">
      <head>
          <meta charset="utf-8" />
          <title>Digital Heroes -- July 9th 2016</title>
          <link rel="dns-prefetch" href="//pbs.twimg.com">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgo=">
          <link rel="stylesheet" href="/css/main.css">
          <script type="text/javascript" src="//use.typekit.net/zsn1cix.js"></script>
          <script>try{Typekit.load({active:function(){var e=document.querySelector(".event");window.dh_el_event_current_height=e.clientHeight}})}catch(e){}</script>
      </head>
      <body class="show-grid">
          <div id="app">${body}</div>

          <script charSet="utf-8" id="__INITIAL_STATE__" type="application/json">${safeStringify(initialState)}</script>

          <script src="/client.js"></script>
          <script>
          window.onload = function () {

            var propDelay = 0;
            var shakeDelay = 1415;

            document.querySelector('body').classList.remove('preload');

            setTimeout(function() {
              document.querySelector('.logo__props').classList.add('logo__props--engaged');
              document.querySelector('.bg2').classList.add('active', 'shake', 'shake_y--fast');
              document.querySelector('.logo').classList.add('shake', 'shake_x', 'shake_x--long');
            }, 200);


          }
          </script>
      </body>
  </html>`;

  // trim that whitespace
  context.body = minify(html, {
    removeAttributeQuotes: true,
    collapseWhitespace: true
  });
};

// Public:

const renderReactComponents = async (context) => {
  try {
    const { redirectLocation, renderProps } = await matchRoutes(context);
    if (redirectLocation) {
      handleRedirect(context, redirectLocation);
    }
    else {
      renderBody(context, renderProps);
    }
  }
  catch (error) {
    await handleError(context, error);
  }
};

export default renderReactComponents;
