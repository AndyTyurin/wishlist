const merge = require('webpack-merge');

/** Common base configuration for any environments and platforms. */
const getBaseConfig = require('./webpack.base.js');

/** Configuration for client-side platform. */
const getClientConfig = require('./webpack.client.js');

/** Configuration for server-side platform. */
const getServerConfig = require('./webpack.server.js');

/** Configuration for api platform. */
const getApiConfig = require('./webpack.api.js');

/** Webpack constants and utilities. */
const webpackUtils = require('./webpack.utils.js');

const configurator = {
  env: webpackUtils.ENV,
  platform: webpackUtils.PLATFORM,
  buildPath: webpackUtils.BUILD_PATH,
  assetsPath: webpackUtils.ASSETS_PATH,
  visualize: webpackUtils.VISUALIZE
};

/** Determines which webpack configuration to use by adjusting the platform. */
let platformConfig;

switch (webpackUtils.PLATFORM) {
  case webpackUtils.CLIENT:
    platformConfig = getClientConfig(configurator);
    break;
  case webpackUtils.SERVER:
    platformConfig = getServerConfig(configurator);
    break;
  case webpackUtils.API:
    platformConfig = getApiConfig(configurator);
}


/** Merge platform specific configuration. */
module.exports = merge(getBaseConfig(configurator), platformConfig);
