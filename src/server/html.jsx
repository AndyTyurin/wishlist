/* eslint-disable react/prop-types */

import React from 'react';

import config from 'config';

const DEFAULT_META_KEYWORDS = config.get('server.metaKeywords');
const DEFAULT_META_DESCRIPTION = config.get('server.metaDescription');
const BASE_URI = config.get('server.baseUri').replace(/\/(?=\/)/g, '');

export const Html = (props) => {
  const {
    initialState = '',
    useStaticAssets,
    assetsManifest = {},
    meta = {
      title: 'Wishlist',
      keywords: DEFAULT_META_KEYWORDS,
      description: DEFAULT_META_DESCRIPTION,
      noIndex: false
    }
  } = props;

  function renderCssImports() {
    return Object.values(assetsManifest)
      .filter(resource => /\.css$/.test(resource))
      .map(resource => (
        <link
          key={resource}
          rel="stylesheet"
          href={`${BASE_URI}assets/${resource}`}
          type="text/css"
        />
      ));
  }

  function renderJsImports() {
    return [
      <script
        key="vendor-asset"
        defer
        src={`${BASE_URI}assets/${assetsManifest['vendor.js']}`}
      />,
      <script
        key="app-asset"
        defer
        src={`${BASE_URI}assets/${assetsManifest['app.js']}`}
      />
    ];
  }

  return (
    <html lang="en">
      <head>
        <title>{meta.title}</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="utf-8" />
        {meta.noIndex && <meta name="robots" content="noindex" />}
        <meta
          name="description"
          content={`${meta.description || DEFAULT_META_DESCRIPTION}`}
        />
        <meta
          name="keywords"
          content={`${meta.keywords || DEFAULT_META_KEYWORDS}`}
        />
        <meta name="author" content="Andy Tyurin" />
        <meta httpEquiv="Cache-Control" content="no-store" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1, maximum-scale=1, initial-scale=1, user-scalable=no"
        />
        <meta name="format-detection" content="telephone=no" />
        {useStaticAssets && renderCssImports()}
      </head>
      <body>
        <div id="app">{props.children}</div>
        <script id="initial-state" type="text/plain" data-json={initialState} />
        {renderJsImports()}
      </body>
    </html>
  );
};

export default Html;
