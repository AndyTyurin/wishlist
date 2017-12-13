const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const utils = require('./webpack.utils.js');

/** Format how to keep chunks. */
const ASSETS_BASE_QUERY = {
  name: '[name].[hash].[ext]',
  limit: 10000
};

module.exports = function (configuration) {
  const assetsPathPrefix = {
    prefix: path.resolve(`${configuration.assetsPath}/`)
  };

  let webpackConfig = {
    resolve: {
      modules: ['node_modules'],
      alias: {
        'wl/client': path.join(__dirname, 'src/client'),
        'wl/util': path.join(__dirname, 'src/util'),
        'wl/server': path.join(__dirname, 'src/server')
      },
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(ttf|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader',
          options: Object.assign(
            { mimetype: 'application/octet-stream' },
            ASSETS_BASE_QUERY
          )
        },
        {
          test: /\.(jpg|jpeg)$/i,
          loader: 'url-loader',
          options: Object.assign({ mimetype: 'image/jpeg' }, ASSETS_BASE_QUERY, assetsPathPrefix)
        },
        {
          test: /\.(png)$/i,
          loader: 'url-loader',
          options: Object.assign({ mimetype: 'image/png' }, ASSETS_BASE_QUERY, assetsPathPrefix)
        },
        {
          test: /\.(gif)$/i,
          loader: 'url-loader',
          options: Object.assign({ mimetype: 'image/gif' }, ASSETS_BASE_QUERY, assetsPathPrefix)
        },
        {
          test: /\.(svg)$/i,
          loader: 'url-loader',
          options: Object.assign({ mimetype: 'image/svg+xml' }, ASSETS_BASE_QUERY, assetsPathPrefix)
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: 'react'
      })
    ]
  };

  /** Environment specific settings. */
  if (configuration.env === utils.DEVELOPMENT) {
    webpackConfig = merge(webpackConfig, {
      devtool: 'inline-source-map',
      plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()]
    });
  } else if (configuration.env === utils.PRODUCTION) {
    webpackConfig = merge(webpackConfig, {
      devtool: 'hidden-source-map'
    });
  }

  return webpackConfig;
};
