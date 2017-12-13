import { searchActionsTypes } from 'wl/client/action';

import defaultSearchState from './search_state';

function changeSearchQuery(state) {
  return {
    ...state,
    isProgress: true
  };
}

function changeSearchQueryResponse(state, { query }) {
  return {
    ...state,
    lastSuccessQuery: query,
    isProgress: false
  };
}

function changeSearchQueryError(state) {
  return {
    ...state,
    isProgress: false
  };
}

export function searchReducer(state = defaultSearchState, { type, payload }) {
  switch (type) {
    case searchActionsTypes.CHANGE_SEARCH_QUERY:
      return changeSearchQuery(state, payload);
    case searchActionsTypes.CHANGE_SEARCH_QUERY_RESPONSE:
      return changeSearchQueryResponse(state, payload);
    case searchActionsTypes.CHANGE_SEARCH_QUERY_ERROR:
      return changeSearchQueryError(state, payload);
    default:
      return state;
  }
}

export default searchReducer;
