const path = require('path');

const moduleName = 'core';
module.exports = {
  entry: {
    commons: [
      path.resolve(__dirname, '../commons', 'index.js'),
    ],
    [moduleName]: [
      path.resolve(__dirname, '../core', './index.js'),
      // path.resolve(__dirname, '../commons', 'index.js'),
    ],
  },
  output: {
    path: path.join(__dirname, '__build__'),
    filename: `${moduleName}.js`,
    library: '[name]_[hash]',
  },
  inject: true,
  publicPath: 'core/',
  moduleName,
  buildFolder: moduleName,
  vendor: true,
  context: path.resolve(__dirname, '../core'),
};