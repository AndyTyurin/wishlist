import filter from 'lodash/filter';

import { hash } from 'wl/util';
import { wishlistActionsTypes } from 'wl/client/action';

import defaultWishlistState from './wishlist_state';

function addToWishlist(state) {
  return {
    ...state,
    isProgress: true,
    isError: false
  };
}

function addToWishlistResponse(state, { product }) {
  product = { ...product, desired: true };
  return {
    ...state,
    products: [...state.products, product],
    isProgress: false
  };
}

function addToWishlistError(state, { error }) {
  console.error(error);
  return {
    ...state,
    isProgress: false,
    isError: true
  };
}

function removeFromWishlist(state) {
  return {
    ...state,
    isProgress: true,
    isError: false
  };
}

function removeFromWishlistResponse(state, { id }) {
  return {
    ...state,
    products: filter(state.products, p => p.id !== id),
    isProgress: false,
    isError: false
  };
}

function removeFromWishlistError(state, { error }) {
  console.error(error);
  return {
    ...state,
    isProgress: false,
    isError: true
  };
}

function getWishlist(state) {
  return {
    ...state,
    isProgress: true,
    isError: false
  };
}

function getWishlistResponse(state, { products }) {
  return {
    ...state,
    products: products.map(product => ({ ...product, id: hash(product.url) }))
  };
}

function getWishlistError(state, { error }) {
  console.error(error);
  return {
    ...state,
    isProgress: false,
    isError: true
  };
}

export function wishlistReducer(
  state = defaultWishlistState,
  { type, payload }
) {
  switch (type) {
    case wishlistActionsTypes.ADD_TO_WISHLIST:
      return addToWishlist(state, payload);
    case wishlistActionsTypes.ADD_TO_WISHLIST_RESPONSE:
      return addToWishlistResponse(state, payload);
    case wishlistActionsTypes.ADD_TO_WISHLIST_ERROR:
      return addToWishlistError(state, payload);
    case wishlistActionsTypes.REMOVE_FROM_WISHLIST:
      return removeFromWishlist(state, payload);
    case wishlistActionsTypes.REMOVE_FROM_WISHLIST_RESPONSE:
      return removeFromWishlistResponse(state, payload);
    case wishlistActionsTypes.REMOVE_FROM_WISHLIST_ERROR:
      return removeFromWishlistError(state, payload);
    case wishlistActionsTypes.GET_WISHLIST:
      return getWishlist(state, payload);
    case wishlistActionsTypes.GET_WISHLIST_RESPONSE:
      return getWishlistResponse(state, payload);
    case wishlistActionsTypes.GET_WISHLIST_ERROR:
      return getWishlistError(state, payload);
    default:
      return state;
  }
}

export default wishlistReducer;
