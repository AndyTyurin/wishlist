/** Ignore in test suites. */
const noop = require('lodash/noop');

require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.png'] = noop;
require.extensions['.jpg'] = noop;
require.extensions['.jpeg'] = noop;
require.extensions['.gif'] = noop;
require.extensions['.svg'] = noop;
