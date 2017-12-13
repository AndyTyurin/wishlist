/* eslint-disable no-template-curly-in-string */

/**
 * Default development configuration for application.
 */

module.exports = {
  server: {
    /**
     * Default meta keywords for all pages.
     */
    metaKeywords: ['spritesheet', 'editor', 'sprite', '2d', 'spritesheetboard'],

    /**
     * Default meta description for all pages.
     */
    metaDescription: 'Place your sprites in spritesheets.',

    /**
     * Determine protocol how web server will be reached.
     *
     * Can be `http` or `https`.
     *
     * Note: It doesn't mean that server has been launched out-of-box by utilizing this protocol.
     */
    protocol: 'http',

    /**
     * Web server's host.
     *
     * Note: It doesn't mean that server has been launched out-of-box by utilizing this host.
     */
    host: 'localhost',

    /**
     * Web server's port.
     */
    port: 8080,

    /**
     * Application's base URI.
     *
     * By which route location application will be available.
     */
    baseUri: '/',

    /**
     * Application's API URI.
     *
     * All API starts from this base URI.
     */
    apiUri: '/api',

    /**
     * Api settings.
     *
     * Each API is unique and has common properties.
     */
    api: {
      search: {
        nodeServiceName: 'search',
        host: 'www.adidas.co.uk',
        endpoint: 'api/suggestions',
        protocol: 'https',
        methods: ['get']
      }
    }
  },
  /**
   * Webpack settings.
   */
  webpack: {
    client: {
      /**
       * Client watcher's port.
       */
      port: 9090
    },
    server: {
      /**
       * Server watcher's port.
       */
      port: 9091
    }
  }
};
