const path = require('path');

const moduleName = 'module2';
module.exports = {
  entry: {
    [moduleName]: path.resolve(__dirname, '../module2/index.js'),
  },
  publicPath: `/${moduleName}/`,
  moduleName,
  buildFolder: `${moduleName}`,
  context: path.resolve(__dirname, `../${moduleName}`),
};
