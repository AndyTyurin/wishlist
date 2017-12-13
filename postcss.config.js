var noop = require('lodash/noop');

module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['last 2 versions', 'ie >= 10', 'android >= 4.4', 'ios >= 8']
    }),
    require('postcss-nested')
  ]
};
