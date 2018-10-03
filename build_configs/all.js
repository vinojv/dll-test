const path = require('path');

module.exports = {
  entry: {
    main: [
      './core/src/index.js',
    ],
  },
  publicPath: '/',
  moduleName: '',
  buildFolder: 'default',
  context: path.join(__dirname, '../core'),
  plugins: [],
};