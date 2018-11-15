/* eslint-disable no-console */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const getConfig = require('./webpack/webpack.dev.config.js');

const PORT = (process.env.PORT || 8000);
const MODULE_NAME = (process.env.MODULE_NAME || 'Default');
const config = getConfig(MODULE_NAME, PORT);
process.on('uncaughtException', function (err) {
  console.error(err.stack);
  console.log('Node NOT Exiting...');
});

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: false,
  historyApiFallback: true,
  noInfo: false,
  stats: 'minimal',
  inline: true,
  overlay: {
    warnings: false,
    errors: true,
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/,
  },
}).listen(PORT, '0.0.0.0', (err) => {
  if (err) console.error(err);
  console.info(`Starting ${MODULE_NAME}`);
  console.info(`Listening at http://localhost:${PORT}`);
  console.info('API: ', api);
}).timeout = 240000;
