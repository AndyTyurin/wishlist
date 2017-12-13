/* eslint-disable class-methods-use-this */
import Service from './service';

export class SearchService extends Service {
  search(query) {
    return this.get(query);
  }
}

export default SearchService;
