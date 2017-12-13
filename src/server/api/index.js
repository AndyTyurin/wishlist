import Router from 'koa-router';

import createApiRouteHandler from './create_api_route_handler';

const apiRouter = new Router();

export function api(apis, apiUri) {
  Object.keys(apis).forEach((apiName) => {
    const {
      methods = [],
      nodeServiceName,
      host,
      port,
      protocol = 'http',
      endpoint
    } = apis[apiName];

    const routeHandler = createApiRouteHandler(
      apiUri,
      nodeServiceName,
      host,
      port,
      protocol,
      endpoint
    );

    methods.forEach((method) => {
      apiRouter[method](`/${nodeServiceName}`, routeHandler);
      apiRouter[method](`/${nodeServiceName}/*`, routeHandler);
    });
  });

  return apiRouter.routes();
}

export default api;
