const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const include = [
  path.resolve(__dirname, '../'),
  path.resolve(__dirname, '../core'),
  path.resolve(__dirname, '../apps'),
  path.resolve(__dirname, '../node_modules/eva'),
  path.resolve(__dirname, '../node_modules/eva-utils'),
  path.resolve(__dirname, '../node_modules/jsoneditor-react/es'),
  path.resolve(__dirname, '../commons'),
];
const babeloptions = fs.readFileSync(path.resolve('./', '.babelrc'), { encoding: 'utf-8' });

module.exports = {
  // noParse: [/brace/],
  rules: [
    // {
    //   test: /\.test\.js$/,
    //   include,
    //   use: [
    //     { loader: 'file-loader' },
    //   ],
    // },
    {
      test: /.worker\.js$/,
      use: [
        {
          loader: 'worker-loader',
          options: {
            inline: false,
            publicPath: '/',
          },
        },
      ],
    },
    {
      test: /\.(md|ttf|txt|eot|ico|otf|svg|png|gif|woff2|woff|jpg|jpeg(2)?)(\?[a-z0-9]+)?$/,
      exclude: [/demo-files/],
      include,
      use: [
        { loader: 'file-loader' },
      ],
    },
    {
      test: /\.html$/,
      loader: 'url-loader',
      include: [
        path.resolve(__dirname, '../core'),
        path.resolve(__dirname, '../apps'),
        path.resolve(__dirname, '../node_modules/eva'),
        path.resolve(__dirname, '../commons'),
      ],
      exclude: [/node_modules/, /demo-files/, /index.html/],
    },
    {
      test: /\.css$/,
      include: [
        path.resolve(__dirname, '../core'),
        path.resolve(__dirname, '../apps'),
        path.resolve(__dirname, '../node_modules/eva'),
        path.resolve(__dirname, '../commons'),
      ],
      exclude: [/global.css/, /flaticon.css/, /iconmoon.css/, /demo-files\/*.css/, /recharts.css/],
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: true,
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          },
        },
      ],
    },
    {
      test: [/global.css/, /flaticon.css/, /iconmoon.css/, /editor.min.css$/],
      include,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            minimize: process.env.NODE_ENV === 'production',
          },
        },
      ],
    },
    {
      test: /\.js$/,
      exclude: [/fonts/, /\.test\.js$/],
      use: {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          ...JSON.parse(babeloptions),
        },
      },
      include,
    },
    {
      test: /\.json$/,
      loader: 'json-loader',
      include,
    },
  ],
  exprContextRegExp: /\.\/.js^\node_modules\$/,
};
