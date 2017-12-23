const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: require.resolve('.'),
  output: {
    filename: 'browser.js',
    library: 'Benchmark',
    libraryTarget: 'umd',
  },
  plugins: [
    new UglifyJSPlugin(),
    new webpack.IgnorePlugin(/^(util|perf_hooks|child_process)/),
  ],
  node: {
    process: false,
  },
};
