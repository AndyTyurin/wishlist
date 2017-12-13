const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ManifestPlugin = require('webpack-manifest-plugin');

const utils = require('./webpack.utils.js');

function isExternal(module) {
  const context = module.context;

  if (typeof context !== 'string') {
    return false;
  }

  return context.indexOf('node_modules') !== -1;
}

module.exports = function(configuration) {
  /**
   * Chunkhash is part of generated files' names and aimed to solve customer's problems:
   * - Longterm caching for common chunk file, because customer can cache the file and
   * use from build to build without downloading it again.
   */
  let hashType = '.[chunkhash]';

  const extractSass = new ExtractTextPlugin({
    filename: `[name]${hashType}.css`,
    disable: configuration.env === utils.DEVELOPMENT
  });

  /** App entry which is common for both environments. */
  const appEntry = ['babel-polyfill', './src/client/index.jsx'];

  const rules = [];

  const plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(configuration.env)
    }),
    extractSass,
    /**
     * Create a chunk with external modules.
     */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return isExternal(module);
      }
    }),
    /**
     * Make a chunk hash which remains while new changes arrives.
     */
    new WebpackChunkHash(),
    new ManifestPlugin({
      fileName: '../server/assets-manifest.json'
    })
  ];

  if (configuration.env === utils.DEVELOPMENT) {
    /** Add hot middleware. */
    appEntry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true');

    hashType = '';

    rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'css-loader',
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
    });
  } else {
    rules.push({
      test: /\.scss$/,
      use: extractSass.extract({
        use: [
          {
            loader: 'css-loader',
            localIdentName: '[name]__[local]--[hash:base64:5]'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ],
        fallback: 'style-loader'
      })
    });

    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        sourceMap: true,
        warnings: false
      })
    );
  }

  /**
   * For perfomance reasons it's necessary to know about your bundles.
   */
  if (configuration.visualize) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: '../report.html'
      })
    );
  }

  return {
    entry: {
      app: appEntry
    },
    output: {
      path: path.join(__dirname, configuration.buildPath, configuration.assetsPath),
      publicPath: `/${configuration.assetsPath}/`,
      filename: `[name]${hashType}.js`,
      chunkFilename: `[name]${hashType}.js`
    },
    module: {
      rules
    },
    plugins
  };
};
