const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

/** External node modules. */
const nodeModules = {};

/** Populate external node modules. */
fs
  .readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = function (configurator) {
  return {
    target: 'node',
    resolve: {
      modules: [path.resolve(__dirname, 'src')]
    },
    entry: ['babel-polyfill', './src/api/index.js'],
    output: {
      path: path.resolve(__dirname, configurator.buildPath, 'api'),
      publicPath: '/',
      filename: 'api_server.js'
    },
    externals: nodeModules,
    plugins: [
      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: true
      })
    ]
  };
};
