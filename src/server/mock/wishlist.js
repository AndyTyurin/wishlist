import config from 'config';

import wishlistDeleteJson from './wishlist_delete.json';
import wishlistGetJson from './wishlist_get.json';
import wishlistPutJson from './wishlist_put.json';
import createMockApi from './create_mock_api';

export function wishlist() {
  createMockApi(config.get('server.api.wishlist.nodeServiceName'), (nock) => {
    nock.get(/.*/g).reply(200, wishlistGetJson);
    nock.put(/.*/g).reply(200, wishlistPutJson);
    nock.delete(/.*/g).reply(200, wishlistDeleteJson);
  });
}

export default wishlist;
