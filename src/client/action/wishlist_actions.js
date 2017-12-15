import { WishlistService, getService } from 'wl/client/service';
import {
  ADD_TO_WISHLIST,
  ADD_TO_WISHLIST_RESPONSE,
  ADD_TO_WISHLIST_ERROR,
  REMOVE_FROM_WISHLIST,
  REMOVE_FROM_WISHLIST_RESPONSE,
  REMOVE_FROM_WISHLIST_ERROR,
  GET_WISHLIST,
  GET_WISHLIST_RESPONSE,
  GET_WISHLIST_ERROR
} from './wishlist_actions_types';

export function addToWishlist(product) {
  return async (dispatch, getState) => {
    const {
      config: { baseUri, csrfToken, services: { wishlist: { name } } }
    } = getState();
    const service = getService(WishlistService, { baseUri, csrfToken, name });

    dispatch({
      type: ADD_TO_WISHLIST
    });

    try {
      await service.addToWishlist(product);

      dispatch({
        type: ADD_TO_WISHLIST_RESPONSE,
        payload: { product }
      });
    } catch (error) {
      dispatch({
        type: ADD_TO_WISHLIST_ERROR,
        payload: {
          error
        }
      });
    }
  };
}

export function removeFromWishlist(id) {
  return async (dispatch, getState) => {
    const {
      config: { baseUri, csrfToken, services: { wishlist: { name } } }
    } = getState();
    const service = getService(WishlistService, { baseUri, csrfToken, name });

    dispatch({
      type: REMOVE_FROM_WISHLIST
    });

    try {
      await service.removeFromWishlist(id);
      dispatch({
        type: REMOVE_FROM_WISHLIST_RESPONSE,
        payload: { id }
      });
    } catch (error) {
      dispatch({
        type: REMOVE_FROM_WISHLIST_ERROR,
        payload: {
          error
        }
      });
    }
  };
}

export function getWishlist() {
  return async (dispatch, getState) => {
    const {
      config: { baseUri, csrfToken, services: { wishlist: { name } } }
    } = getState();
    const service = getService(WishlistService, { baseUri, csrfToken, name });

    dispatch({
      type: GET_WISHLIST
    });

    try {
      const wishlist = await service.getWishlist();
      dispatch({
        type: GET_WISHLIST_RESPONSE,
        payload: {
          products: wishlist.products
        }
      });
    } catch (error) {
      dispatch({
        type: GET_WISHLIST_ERROR,
        payload: {
          error
        }
      });
    }
  };
}
