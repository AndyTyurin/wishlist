import { createSelector } from 'reselect';
import zipObject from 'lodash/zipObject';

export const getWishlistProducts = state => state.wishlist.products;
export const getSearchProducts = state => state.search.products;

export const getProducts = createSelector(
  getWishlistProducts,
  getSearchProducts,
  (wishlistProducts, searchProducts) => {
    wishlistProducts = zipObject(
      wishlistProducts.map(p => p.id),
      wishlistProducts
    );
    return searchProducts.map(product => ({
      ...product,
      ...(wishlistProducts[product.id] || {})
    }));
  }
);
