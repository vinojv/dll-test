const path = require('path');

const moduleName = 'core';
module.exports = {
  entry: {
    libraries: [
      'react',
    ],
    [moduleName]: [
      path.resolve(__dirname, '../core', './index.js'),
      path.resolve(__dirname, '../core', './core_submodule.js'),
    ],
  },
  output: {
    path: path.join(__dirname, '__build__'),
    filename: `${moduleName}.[name].js`,
    library: '[name]_[hash]',
  },
  inject: true,
  publicPath: 'core/',
  moduleName,
  buildFolder: moduleName,
  vendor: true,
  context: path.resolve(__dirname, '../core'),
};