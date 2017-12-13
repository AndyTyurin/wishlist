import { combineReducers } from 'redux';

import { searchReducer } from './search_reducer';

const reducersMap = {
  config: (config = {}) => config,
  search: searchReducer
};

export const reducers = combineReducers(reducersMap);

export default reducers;
