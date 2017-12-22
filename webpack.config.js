const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: require.resolve('.'),
  output: {
    filename: 'browser.js',
    library: 'Benchmark',
    libraryTarget: 'umd',
  },
  plugins: [
    new UglifyJSPlugin(),
  ],
  node: {
    util: 'empty',
  },
  resolve: {
    alias: {
      perf_hooks: require.resolve('./src/mock_perf_hooks'),
    },
  },
};
