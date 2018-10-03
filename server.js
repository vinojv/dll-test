/* eslint-disable no-console */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const getConfig = require('./webpack/webpack.dev.config.js');

const PORT = (process.env.PORT || 8000);
const API_HOST = (process.env.API_HOST || '52.90.104.163');
const API_PORT = (process.env.API_PORT || 9999);
const MODULE_NAME = (process.env.MODULE_NAME || 'Default');
const api = `http://${API_HOST}:${API_PORT}`;
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
  host: API_HOST,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/,
  },
  proxy: {
    '/bigbrain/data-lake/ws/*': {
      ws: true,
      target: api,
    },
    '/bigbrain/graph_manager/*': {
      // target: 'http://34.220.135.100:9009/',
      target: api,
    },
    '/access-token': {
      target: api,
    },
    '/refresh-token': {
      target: api,
    },
    '/user/*': {
      target: `http://${API_HOST}:8000`,
    },
    '/bigbrain/*': {
      target: api,
    },
    '/es': {
      target: api,
    },
    '/bigbrain/graph_manager/': {
      target: api,
    },
    '/designer/*': {
      target: `http://${API_HOST}:8000`,
    },
    '/bigbrain/recipe-app/*': {
      target: `http://${API_HOST}:8000`,
    },
    '/rest/model-builder/*': {
      target: `http://${API_HOST}:8000`,
    },
    '/bigbrain/model-lifecycle/*': {
      target: `http://${API_HOST}:8000`,
    },
    '/block/rest/v1/*': {
      target: api,
    },
    '/rest/bigbrain/*': {
      target: api,
    },
    '/tensor_temp/*': {
      target: `http://${API_HOST}:8000`,
    },
    '/bigbrain/eai-explorer/eai/*': {
      target: `http://${API_HOST}:8000`,
    },
    '/bigbrain/eai-explorer/*': {
      target: `http://${API_HOST}:8000`,
    },
    '/auth': {
      target: 'http://localhost:8000/',
    },
    '/logout': {
      target: 'http://localhost:8000/',
    },
    '/ws/*': api,
    '/api/': {
      ws: true,
      target: `ws://${API_HOST}:8000`,
    },
    '/api/*': `http://${API_HOST}:8000`,
  },
}).listen(PORT, '0.0.0.0', (err) => {
  if (err) console.error(err);
  console.info(`Starting ${MODULE_NAME}`);
  console.info(`Listening at http://localhost:${PORT}`);
  console.info('API: ', api);
}).timeout = 240000;
