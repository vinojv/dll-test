const express = require('express');
const fallback = require('express-history-api-fallback');
const proxy = require('express-http-proxy');
const compression = require('compression');

const app = express();

const root = `${__dirname}/__build__`;
app.use(compression());
app.use(express.static(root));
app.use(fallback('index.html', { root }));
const URL_PROXY = 'http://bigbraindev.razorthink.net:8000';
app.use('/', proxy(URL_PROXY));

app.listen(9399, () => {
  console.log(`App is running successfully 
    on http://localhost:9399
    proxied to ${URL_PROXY}
  `);
});
