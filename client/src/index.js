import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import ReduxThunk from 'redux-thunk';

import { reducers } from './reducers';
import App from './App';
import "./index.css"

const middlewares = [ReduxThunk];

const store = createStore(reducers, compose(applyMiddleware(...middlewares)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);