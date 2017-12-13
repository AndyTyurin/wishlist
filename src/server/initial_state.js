import config from 'config';
import mapValues from 'lodash/mapValues';

import { version } from './../../package.json';

const {
  apiUri, baseUri, protocol, host, port, api: apis
} = config.get(
  'server'
);

function createServiceSettingsFromApis(apis) {
  return mapValues(apis, api => ({
    name: api.nodeServiceName
  }));
}

export const getInitialState = csrfToken => ({
  config: {
    baseUri,
    apiUri,
    services: createServiceSettingsFromApis(apis),
    protocol,
    host,
    port,
    appVersion: version,
    csrfToken
  }
});

export default getInitialState;
