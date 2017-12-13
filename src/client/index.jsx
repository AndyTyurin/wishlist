import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { configureReduxStore } from 'wl/client/store';

import App from './component/app/app';

const initialState = JSON.parse(
  document.getElementById('initial-state').getAttribute('data-json')
);

const { baseUri } = initialState.config;

/** Create & init redux storage. */
const store = configureReduxStore(initialState);

hydrate(
  <Provider store={store}>
    <BrowserRouter basename={baseUri}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
