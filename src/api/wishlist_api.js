import Router from 'koa-router';
import remove from 'lodash/remove';
import find from 'lodash/find';

/**
 * Place products of the wishlists here.
 */
const wishlistProducts = [];

const wishlistRouter = new Router();

export function wishlistApi() {
  wishlistRouter.get('/', (ctx) => {
    ctx.status = 200;
    ctx.body = { products: wishlistProducts };
  });

  wishlistRouter.del('/:id', (ctx, next) => {
    const { params: { id } } = ctx;
    const wishlistLength = wishlistProducts.length;

    // Mutate array!
    // tbd @andytyurin avoid mutation?
    remove(wishlistProducts, { id });

    if (wishlistLength !== wishlistProducts.length) {
      ctx.status = 204;
    } else {
      // tbd @andytyurin handle errors, add specific messages?
      next();
    }
  });

  wishlistRouter.put('/:id', (ctx, next) => {
    const { params: { id }, request: { body: product } } = ctx;
    const {
      url, imageSource, title, subTitle
    } = product;
    const productAlreadyInWishlist = find(wishlistProducts, { id });

    // Should be validated on types, limits content and so on.
    // But in test purposes we avoid all of this checks!
    // tdb: @andytyurin validate?
    if (!productAlreadyInWishlist && url && imageSource && title && subTitle) {
      wishlistProducts.push({
        id,
        url,
        imageSource,
        title,
        subTitle
      });

      ctx.status = 204;
    } else {
      // tbd @andytyurin handle errors, add specific messages?
      next();
    }
  });

  return wishlistRouter.routes();
}

export default wishlistApi;
