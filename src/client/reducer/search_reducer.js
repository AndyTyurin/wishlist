import { searchActionsTypes } from 'wl/client/action';

import defaultSearchState from './search_state';

function changeSearchQueryResponse(state, payload) {
  // tbd implement
  return state;
}

function changeSearchQueryError(state, payload) {
  // tbd implement
  return state;
}

export function searchReducer(state = defaultSearchState, { type, payload }) {
  switch (type) {
    case searchActionsTypes.CHANGE_SEARCH_QUERY_RESPONSE:
      return changeSearchQueryResponse(state, payload);
    case searchActionsTypes.CHANGE_SEARCH_QUERY_ERROR:
      return changeSearchQueryError(state, payload);
    default:
      return state;
  }
}

export default searchReducer;
