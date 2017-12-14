import { searchActionsTypes } from 'wl/client/action';

import defaultSearchState from './search_state';

function changeSearchQuery(state) {
  return {
    ...state,
    isProgress: true,
    isError: false
  };
}

function changeSearchQueryResponse(state, { query, products }) {
  return {
    ...state,
    lastSuccessQuery: query,
    isProgress: false,
    products: products.map(({
      suggestion, subTitle, image, url
    }) => ({
      url,
      title: suggestion,
      subTitle,
      imageSource: image.replace('sw=60', 'sw=256').replace('sh=60', 'sh=256')
    }))
  };
}

function changeSearchQueryError(state) {
  return {
    ...state,
    isProgress: false,
    isError: true
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
