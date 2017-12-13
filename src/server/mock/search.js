import suggestionsJson from './suggestions.json';
import createMockApi from './create_mock_api';

export function search() {
  createMockApi('search', (nock) => {
    nock.get(/.*/g).reply(200, suggestionsJson);
  });
}

export default search;
