const path = require('path');

const moduleName = 'core';
module.exports = {
  entry: {
    [moduleName]: path.resolve(__dirname, '../core', './index.js'),
  },
  publicPath: '/core/',
  moduleName,
  buildFolder: moduleName,
  context: path.resolve(__dirname, '../core'),
};