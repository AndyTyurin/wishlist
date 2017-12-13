import proxy from 'koa-proxy';
import convert from 'koa-convert';

export function createApiRouteHandler(
  apiUri,
  nodeServiceName,
  host,
  port,
  protocol
) {
  return convert(
    proxy({
      host: `${protocol}://${host}:${port}`,
      jar: true,
      map: (path) => {
        const serviceUri = `/${apiUri}/${nodeServiceName}`.replace(
          /\/(?=\/)/,
          ''
        );
        return path.replace(serviceUri, '');
      }
    })
  );
}

export default createApiRouteHandler;
