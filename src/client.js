'use strict';

import React from 'react';
import { render } from 'react-dom';
import { browserHistory, match } from 'react-router';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

const mountPoint = document.getElementById('app');

// This gets put in a store going forward???
const initialState = JSON.parse(document.getElementById('__INITIAL_STATE__').innerHTML);

// const store = createStore(
//   reducer,
//   initialState,
//   applyMiddleware(thunkMiddleware)
// );
const store = createStore(
  combineReducers({
    events: reducer,
    routing: routerReducer
  }),
  initialState,
  applyMiddleware(thunkMiddleware)
);

console.log('Hydrated state:', store.getState());

import routes from './routes';

const history = syncHistoryWithStore(browserHistory, store);
const { dispatch } = store;

// history.listen(location => {
  // analyticsService.track(location.pathname);
// });

// <Router routes={ routes } history={ history } />

match({history, routes}, (/* error, redirectLocation, renderProps*/) => {
  render(
    <Provider store={ store } key="provider">
      { routes(history, dispatch) }
    </Provider>,
    mountPoint
  );
});
