import config from 'config';

import suggesionsJson from './suggestions.json';
import createMockApi from './create_mock_api';

const { nodeServiceName } = config.get('server.api.search');

export function search() {
  createMockApi('search', (nock) => {
    nock.get(`/${nodeServiceName}`).reply(suggesionsJson);
  });
}

export default search;
