import proxy from 'koa-proxy';
import convert from 'koa-convert';

export function createApiRouteHandler(
  apiUri,
  nodeServiceName,
  host,
  port,
  protocol,
  endpoint = '/'
) {
  return convert(
    proxy({
      host: `${protocol}://${host}`,
      jar: false,
      map: (path) => {
        const serviceUri = `/${apiUri}/${nodeServiceName}`.replace(
          /\/(?=\/)/,
          ''
        );

        return path.replace(serviceUri, endpoint);
      }
    })
  );
}

export default createApiRouteHandler;
