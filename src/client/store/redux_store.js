import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from 'wl/client/reducer';

// React dev tools.
// Look at https://github.com/zalmoxisus/redux-devtools-extension
function getDevTools() {
  return process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.devToolsExtension
    ? window.devToolsExtension()
    : f => f;
}

export function configureReduxStore(state) {
  const middlewares = [thunk];
  const enhanser = compose(applyMiddleware(...middlewares), getDevTools());
  return createStore(reducers, state, enhanser);
}

export default configureReduxStore;
