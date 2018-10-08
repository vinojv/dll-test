const path = require('path');

const moduleName = 'module1';
module.exports = {
  entry: {
    [moduleName]: path.resolve(__dirname, '../module1/index.js'),
  },
  publicPath: `${moduleName}/`,
  moduleName,
  inject: true,
  buildFolder: `${moduleName}`,
  context: path.resolve(__dirname, '../module1'),
};
