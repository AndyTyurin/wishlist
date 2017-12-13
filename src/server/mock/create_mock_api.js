import nock from 'nock';
import config from 'config';

function throwError(propertyName, api) {
  throw new Error(
    `${propertyName.toUpperCase()} is not defined for api '${api}'`
  );
}

export function createMockApi(api, cb) {
  const { host, port, protocol } = config.get(`server.api.${api}`);

  if (typeof host === 'undefined') {
    throwError('host', api);
  }

  if (typeof port === 'undefined') {
    throwError('port', api);
  }

  if (typeof protocol === 'undefined') {
    throwError('protocol', api);
  }

  const serviceHost = `${host}:${port}`.replace(/\/(?=\/)/g, '');

  cb(nock(`${protocol}://${serviceHost}`).persist());
}

export default createMockApi;
