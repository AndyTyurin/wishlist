import axios from 'axios';
import qs from 'qs';

import { csrfTokenKey } from './csrf_token';

const commonHeaders = {
  'content-type': 'application/json'
};

export class Service {
  static _getResponseData({ data }) {
    return data;
  }

  static _getErrorObject(data, status) {
    return { data, status };
  }

  static _throwError({ response: { data, status } }) {
    throw Service._getErrorObject(data, status);
  }

  _axios;

  constructor(serviceUrl, { baseUrl = '/api', headers, csrfTokenValue }) {
    this._axios = axios.create({
      baseURL: `${baseUrl}/${serviceUrl}`.replace(/\/(?=\/)/g, ''),
      headers: { ...commonHeaders, ...headers, [csrfTokenKey]: csrfTokenValue },
      xsrfCookieName: csrfTokenKey,
      xsrfHeaderName: csrfTokenKey,
      timeout: 10000
    });
  }

  get(endpoint, { query, headers = {} } = {}) {
    return this._axios
      .get(`${endpoint}${query ? `?${qs.stringify(query)}` : ''}`, { headers })
      .then(Service._getResponseData)
      .catch(Service._throwError);
  }

  post(endpoint, { data, headers = {} } = {}) {
    return this._axios
      .post(String(endpoint), data, { headers })
      .then(Service._getResponseData)
      .catch(Service._throwError);
  }

  put(endpoint, { data, headers = {} } = {}) {
    return this._axios
      .put(String(endpoint), data, { headers })
      .then(this._getResponseData)
      .catch(this._throwError);
  }

  del(endpoint, { headers = {} } = {}) {
    return this._axios
      .delete(String(endpoint), null, { headers })
      .then(Service._getResponseData)
      .catch(Service._throwError);
  }

  patch(endpoint, { data, headers = {} } = {}) {
    return this._axios
      .patch(String(endpoint), data, { headers })
      .then(Service._getResponseData)
      .catch(Service._throwError);
  }
}

export default Service;
