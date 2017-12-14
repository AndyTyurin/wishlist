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
    const service = getService(WishlistService, getState());

    dispatch({
      type: ADD_TO_WISHLIST
    });

    try {
      await service.addToWishlist(product);

      dispatch({
        type: ADD_TO_WISHLIST_RESPONSE
      });
    } catch (err) {
      dispatch({
        type: ADD_TO_WISHLIST_ERROR,
        payload: err
      });
    }
  };
}

export function removeFromWishlist(productUrl) {
  return async (dispatch, getState) => {
    const service = getService(WishlistService, getState());

    dispatch({
      type: REMOVE_FROM_WISHLIST
    });

    try {
      await service.removeFromWishlist(productUrl);
      dispatch({
        type: REMOVE_FROM_WISHLIST_RESPONSE
      });
    } catch (err) {
      dispatch({
        type: REMOVE_FROM_WISHLIST_ERROR,
        payload: err
      });
    }
  };
}

export function getWishlist() {
  return async (dispatch, getState) => {
    const service = getService(WishlistService, getState());

    dispatch({
      type: GET_WISHLIST
    });

    try {
      await service.getWishlist();
      dispatch({
        type: GET_WISHLIST_RESPONSE
      });
    } catch (err) {
      dispatch({
        type: GET_WISHLIST_ERROR,
        payload: err
      });
    }
  };
}
