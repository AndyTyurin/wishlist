import Service from './service';

export class WishlistService extends Service {
  addToWishlist(product) {
    return this.put(product.id, { data: product });
  }

  removeFromWishlist(productId) {
    return this.del(productId);
  }

  getWishlist() {
    return this.get();
  }
}

export default WishlistService;
