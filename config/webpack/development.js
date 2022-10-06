const shared = require('./shared');

const config = {
  ...shared,
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    poll: true,
    ignored: /node_modules/,
  },
  stats: {
    errorDetails: true,
  },
  plugins: shared.plugins.concat([]),
};

module.exports = config;
