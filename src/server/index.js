/* eslint-disable no-console */

import Koa from 'koa';
import CSRF from 'koa-csrf';
import Router from 'koa-router';
import route from 'koa-route';
import session from 'koa-session';
import bodyParser from 'koa-bodyparser';
import compose from 'koa-compose';
import convert from 'koa-convert';
import proxy from 'koa-proxy';
import logger from 'koa-logger';
import config from 'config';
import Boom from 'boom';

import webpackUtils from './../../webpack.utils';
import universal from './universal';
import mock from './mock';
import api from './api';

const webpackClientServerPort = config.get('webpack.client.port');
const app = new Koa();
const port = config.get('server.port');
const apis = config.get('server.api');
const apiUri = config.get('server.apiUri');
const router = new Router();
const isDevelopment = webpackUtils.ENV === webpackUtils.DEVELOPMENT;

/** Keys for signed cookies. */
app.keys = ['wishlist'];

// eslint-disable-next-line import/no-unresolved, global-require
const assetsManifest = require('./assets-manifest.json');

if (isDevelopment) {
  /**
   * Proxy assets will be used for development environment only.
   * Production assets will be gathered by nginx and not presented here.
   */
  app.use(
    route.get(
      '/assets/*',
      convert(proxy({ host: `http://localhost:${webpackClientServerPort}` }))
    )
  );

  /**
   * Mock services responses.
   */
  // mock();
}

/**
 * CSRF token usage.
 */
app.use(
  convert(
    new CSRF({
      invalidSessionSecretMessage: 'Invalid session',
      invalidSessionSecretStatusCode: 403,
      invalidTokenMessage: 'Invalid security token',
      invalidTokenStatusMessage: 403,
      excludedMessage: ['GET', 'HEAD', 'OPTIONS'],
      disableQuery: true
    })
  )
);

/**
 * Initialize proxy api.
 */
router.use('/api', api(apis, apiUri));

/**
 * Initialize universal.
 *
 * It has his own implementation of routing which used on both
 * client & server sides.
 */
router.get(
  '/*',
  universal({ useStaticAssets: !isDevelopment, assetsManifest })
);

const middlewareBatch = [
  logger(),
  session(app),

  /**
   * Health checking is required and used both
   * in development & production modes.
   *
   * Be aware of removing it!
   */
  route.get('/health', (ctx) => {
    ctx.response.status = 200;
    ctx.response.body = '';
  }),

  bodyParser(),
  router.routes(),
  router.allowedMethods({
    throw: true,
    // eslint-disable-next-line new-cap
    notImplemented: () => new Boom.notImplemented(),
    // eslint-disable-next-line new-cap
    methodNotAllowed: () => new Boom.methodNotAllowed()
  })
];

/** Proceed middleware batch. */
app.use(compose(middlewareBatch));

/** Start web-server. */
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Web-server started on port :${port}`);
});

/**
 * Close web-server gracefully.
 */
function gracefullyClose() {
  // eslint-disable-next-line no-console
  console.log('Web-server successfully closed.');
  process.exit();
}

/**
 * Handle process signals.
 * If there are close the application, it should be
 * closed gracefully.
 */
process.on('SIGINT', gracefullyClose);
process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.error('Uncaught exception occurred', err);
  // eslint-disable-next-line no-console
  console.error('Closing web-server...');
  gracefullyClose();
});
