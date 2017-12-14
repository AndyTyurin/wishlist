import Service from './service';

export class SearchService extends Service {
  addToWishlist(product) {
    return this.put(product.id, product);
  }

  removeFromWishlist(productId) {
    return this.del(productId);
  }

  getWishlist() {
    return this.get();
  }
}

export default SearchService;
