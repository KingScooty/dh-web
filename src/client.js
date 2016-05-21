'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

const mountPoint = document.getElementById('app');

// This gets put in a store going forward???
const initialState = JSON.parse(document.getElementById('__INITIAL_STATE__').innerHTML);

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunkMiddleware)
);

import routes from './routes';

render(
  <Provider store={ store } key="provider">
    <Router routes={ routes } history={ browserHistory } />
  </Provider>,
  mountPoint
);
