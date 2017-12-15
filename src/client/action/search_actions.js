/* eslint-disable import/prefer-default-export */

import { SearchService, getService } from 'wl/client/service';

import {
  CHANGE_SEARCH_QUERY,
  CHANGE_SEARCH_QUERY_RESPONSE,
  CHANGE_SEARCH_QUERY_ERROR
} from './search_actions_types';

export function changeSearchQuery(query) {
  return async (dispatch, getState) => {
    const {
      config: { baseUri, csrfToken, services: { search: { name } } }
    } = getState();
    const service = getService(SearchService, { baseUri, csrfToken, name });

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
    } catch (error) {
      dispatch({
        type: CHANGE_SEARCH_QUERY_ERROR,
        payload: {
          error
        }
      });
    }
  };
}
