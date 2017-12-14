/* eslint-disable import/prefer-default-export */

import { SearchService, getService } from 'wl/client/service';

import {
  CHANGE_SEARCH_QUERY,
  CHANGE_SEARCH_QUERY_RESPONSE,
  CHANGE_SEARCH_QUERY_ERROR
} from './search_actions_types';

export function changeSearchQuery(query) {
  return async (dispatch, getState) => {
    const service = getService(SearchService, getState());

    dispatch({
      type: CHANGE_SEARCH_QUERY,
      payload: { query }
    });

    try {
      const { products } = await service.search(query);
      dispatch({
        type: CHANGE_SEARCH_QUERY_RESPONSE,
        payload: {
          query,
          products
        }
      });
    } catch (err) {
      dispatch({
        type: CHANGE_SEARCH_QUERY_ERROR,
        payload: err
      });
    }
  };
}
