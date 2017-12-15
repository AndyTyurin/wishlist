import { combineReducers } from 'redux';

import { searchReducer } from './search_reducer';
import { wishlistReducer } from './wishlist_reducer';

const reducersMap = {
  config: (config = {}) => config,
  search: searchReducer,
  wishlist: wishlistReducer
};

export const reducers = combineReducers(reducersMap);

export default reducers;
