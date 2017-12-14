const argv = require('minimist')(process.argv.slice(2));

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
const CLIENT = 'client';
const SERVER = 'server';
const API = 'api';

module.exports = {
  /** Development constant. Used to determine environment. */
  DEVELOPMENT,
  /** Production constant. Used to determine environment. */
  PRODUCTION,
  /** Client constant. Used to determine platform. */
  CLIENT,
  /** Server constant. Used to determine platform. */
  SERVER,
  /** API constatnt. Used to determine platform. */
  API,
  /** Build path defines path where application's files will be placed after building. */
  BUILD_PATH: 'dist',
  /** Assets path defines place indide building directory where assets will be placed. */
  ASSETS_PATH: 'assets',
  /** Environment determines settings how application will be built and which tools will be used to do it. */
  ENV: process.env.NODE_ENV || DEVELOPMENT,
  /** Platform determines which server to use, client which will work with client-side assets, server-side. */
  PLATFORM: (process.env.platform || argv.platform || CLIENT).toLowerCase(),
  /** Visualize webpack output chunks or not. */
  VISUALIZE: Boolean(process.env.visualize)
};
