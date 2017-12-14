import config from 'config';

import searchJson from './search.json';
import createMockApi from './create_mock_api';

export function search() {
  createMockApi(config.get('server.api.search.nodeServiceName'), (nock) => {
    nock.get(/.*/g).reply(200, searchJson);
  });
}

export default search;
