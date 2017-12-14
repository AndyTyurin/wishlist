/* eslint-disable import/prefer-default-export */

import { SearchService } from 'wl/client/service';

import {
  CHANGE_SEARCH_QUERY,
  CHANGE_SEARCH_QUERY_RESPONSE,
  CHANGE_SEARCH_QUERY_ERROR
} from './search_actions_types';

export function changeSearchQuery(query) {
  return (dispatch, getProps) => {
    /**
     * tbd @andytyurin
     * State can be enrich by services before, on stage
     * of client-side initialization in entry point.
     * But right now enough to have this one.
     */
    const {
      config: { baseUri, csrfToken, services: { search: { name } } }
    } = getProps();
    const service = new SearchService(name, {
      baseUri,
      csrfTokenValue: csrfToken
    });

    dispatch({
      type: CHANGE_SEARCH_QUERY,
      payload: { query }
    });

    service
      .search(query)
      .then(res =>
        dispatch({
          type: CHANGE_SEARCH_QUERY_RESPONSE,
          payload: {
            query,
            products: res.products
          }
        })
      )
      .catch(err =>
        dispatch({
          type: CHANGE_SEARCH_QUERY_ERROR,
          payload: err
        })
      );
  };
}
