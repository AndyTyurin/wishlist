import React from 'react';
import Boom from 'boom';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';

import { csrfTokenKey } from 'wl/client/service';
import { configureReduxStore } from 'wl/client/store';

import { Html } from './html';
import { App } from './../client/component/app/app';
import { routes } from './../client/routes';
import { initialState } from './initial_state';

export function universal({ useStaticAssets = false, assetsManifest }) {
  return async ctx =>
    new Promise((resolve) => {
      const path = ctx.request.url;
      const store = configureReduxStore(initialState);
      // eslint-disable-next-line prefer-destructuring
      const response = ctx.response;
      const branch = matchRoutes(routes, path)[1];
      const routerContext = {};
      const csrfToken = ctx.csrf;

      /**
       * Do not cache server-side rendering pages.
       */
      ctx.set('Cache-Control', 'no-store');

      /**
       * Handle route config by settings status to 200 if found,
       * otherwise 404 and check authorization access for a page.
       */
      if (branch) {
        const { path, meta } = branch.route;

        if (path !== '*') {
          response.status = 200;
        } else {
          response.status = 404;
        }

        response.type = 'text/html';

        ctx.res.write('<!DOCTYPE html>');

        const stream = ReactDOMServer.renderToNodeStream(
          <Html
            initialState={JSON.stringify(initialState)}
            {...{
              csrfTokenKey,
              csrfToken,
              useStaticAssets,
              assetsManifest,
              meta
            }}
          >
            <Provider store={store}>
              <StaticRouter location={path} context={routerContext}>
                <App />
              </StaticRouter>
            </Provider>
          </Html>
        ).pipe(ctx.res);

        stream.on('end', () => {
          resolve();
        });
      } else {
        // eslint-disable-next-line no-console
        console.error(
          'Universal error page is not listened in react router config'
        );
        response.body = Boom.notFound();
        response.status = 404;
      }
    });
}

export default universal;
