const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

/** External node modules. */
const nodeModules = {
  /** Ignore assets manifest from importing on server-side. */
  './assets-manifest.json': 'commonjs ./assets-manifest.json'
};

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
    entry: ['babel-polyfill', './src/server/index.js'],
    output: {
      path: path.resolve(__dirname, configurator.buildPath, 'server'),
      publicPath: '/',
      filename: 'server.js'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'css-loader/locals',
              options: {
                sourceMap: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
                modules: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
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
