/* eslint-disable no-console */

import Koa from 'koa';
import Router from 'koa-router';
import route from 'koa-route';
import bodyParser from 'koa-bodyparser';
import compose from 'koa-compose';
import logger from 'koa-logger';
import config from 'config';
import Boom from 'boom';

import wishlistApi from './wishlist_api';

const app = new Koa();
const port = config.get('apiServer.port');
const router = new Router();

/**
 * Initialize proxy api.
 */
router.use('/wishlist', wishlistApi());

const middlewareBatch = [
  logger(),

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
  console.log(`API server started on port :${port}`);
});

/**
 * Close web-server gracefully.
 */
function gracefullyClose() {
  // eslint-disable-next-line no-console
  console.log('API server successfully closed.');
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
  console.error('Closing API server...');
  gracefullyClose();
});
