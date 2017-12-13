const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const fs = require('fs');

const getBaseConfig = require('./webpack.base.js');
const webpackUtils = require('./webpack.utils.js');

const configurator = {
  env: webpackUtils.ENV,
  platform: webpackUtils.PLATFORM,
  buildPath: webpackUtils.BUILD_PATH,
  assetsPath: webpackUtils.ASSETS_PATH,
  visualize: webpackUtils.VISUALIZE
};

/** External node modules. */
const nodeModules = {
  /** Ignore assets manifest from importing on server-side. */
  './assets-manifest.json': 'commonjs ./assets-manifest.json'
};

/** Populate external node modules. */
fs.readdirSync('node_modules').filter(x => ['.bin'].indexOf(x) === -1).forEach(mod => {
  nodeModules[mod] = `commonjs ${mod}`;
});


/** App entry which is common for both environments. */
const appEntry = [
  'babel-polyfill',
  './test/ignore_styles.js',
  './src/client/index.jsx'
];

webpackConfig = merge(getBaseConfig(configurator), {
  entry: {
    app: appEntry
  },
  output: {
    path: path.join(__dirname, configurator.buildPath, configurator.assetsPath),
    publicPath: `/${configurator.assetsPath}/`,
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'pixi.js': 'empty-module'
    }
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        include: path.join(__dirname, 'node_modules', 'pixi.js'),
        loader: 'json'
      },
      {
        enforce: 'post',
        include: path.resolve(__dirname, 'node_modules/pixi.js'),
        loader: 'transform-loader',
        options: {
          brfs: true
        }
      },
      { test: /\.scss$/, loader: 'ignore-loader' }
    ]
  },
  externals: nodeModules,
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("jsdom-global/register");',
      raw: true,
      entryOnly: true
    })
  ]
});

module.exports = webpackConfig;
