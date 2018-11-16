/* eslint-disable import/no-extraneous-dependencies,prefer-template */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const base = require('./webpack.base.config');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

var AssetsPlugin = require('assets-webpack-plugin');

module.exports = ({
  entry, moduleName, buildFolder, context, inject,
  publicPath = '/', plugins = [],
}) => ({
  // devtool: 'cheap',
  mode: 'production',
  entry,
  output: {
    path: path.join(__dirname, '../__build__', `${buildFolder || 'default'}`),
    filename: `${moduleName ? (`${moduleName}.`) : ''}[name].[contenthash].js`,
    chunkFilename: `${moduleName ? (`${moduleName}.`) : ''}[name].[contenthash].chunk.js`,
    publicPath: publicPath || buildFolder,
    globalObject: 'this',
  },
  cache: true,
  module: base,
  resolve: {
    extensions: ['.js'],
    // alias: {
      // Commons: path.resolve(__dirname, '../core/core_submodules.js'),
    //   core: path.resolve(__dirname, '../core'),
    //   module1: path.resolve(__dirname, '../module1'),
    //   module2: path.resolve(__dirname, '../module2'),
    // },
    modules: [
      'node_modules',
      path.join(__dirname, '../'),
      // context || path.resolve(__dirname, '..'),
    ],
    cacheWithContext: false,
  },
  parallelism: 10,
  performance: {
    hints: 'warning',
  },
  optimization: {
    minimize: false,
  },
  target: 'web',
  // optimization: {
  //   // minimizer: [
  //   //   new UglifyJSPlugin({
  //   //     cache: true,
  //   //     parallel: true,
  //   //     uglifyOptions: {
  //   //       compress: {
  //   //         drop_console: true,
  //   //       },
  //   //     },
  //   //   }),
  //   //   new OptimizeCSSAssetsPlugin({
  //   //     cssProcessorOptions: { discardComments: { removeAll: true } },
  //   //   }),
  //   // ],
  //   minimize: false,
  //   // runtimeChunk: true,
  //   removeEmptyChunks: true,
  //   removeAvailableModules: true,
  //   occurrenceOrder: true,
  //   concatenateModules: true,
  //   splitChunks: {
  //     chunks: 'async',
  //     minSize: 30000,
  //     minChunks: 1,
  //     maxAsyncRequests: 5,
  //     maxInitialRequests: 3,
  //   },
  // },
  plugins: [
    ...plugins,
    {
      apply: (compiler) => {
        compiler.hooks.done.tap('Progress', (compilation) => {
          console.log(`\n Compilation took ${((compilation.endTime - compilation.startTime) / 1000)} s`);
        });
      },
    },
    // new LodashModuleReplacementPlugin,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        NO_AUTH: process.env.NO_AUTH ? process.env.NO_AUTH : false,
        APP_PLATFORM: JSON.stringify(process.env.APP_PLATFORM || 'ide'),
      },
    }),
    // new ManifestPlugin({
    //   generate: (seed, files) => files.reduce((manifest, { name, path }) => ({ ...manifest, [name]: path }), seed),
    //   serialize: (manifest) => {
    //     console.log('\nmanifest', manifest, manifest.isAsset, manifest.isInitial, manifest.isChunk);
    //     return JSON.stringify(manifest, null, 2);
    //   },
    // }),
    // new ManifestPlugin({
    //   fileName: 'initial.json',
    // }),
    new AssetsPlugin({
      path: path.join('__build__', publicPath || buildFolder),
      filename: 'assets.json',
      prettyPrint: true,
      entrypoints: true,
    }),
    new webpack.ProgressPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/, /lodash/, /immutable/, /react/, /eva/, 'brace'),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    ...(inject ? [new HtmlWebpackPlugin({
      template: 'index.html',
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeRedundantAttributes: true,
      //   useShortDoctype: true,
      //   removeEmptyAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   keepClosingSlash: true,
      //   minifyJS: true,
      //   minifyCSS: true,
      //   minifyURLs: true,
      // },
      inject: true,
      chunksSortMode: 'dependency',
    })] : []),
    new webpack.DllReferencePlugin(
      {
        // context: path.join(__dirname, '../__build__'),
        context: '.',
        manifest: require('./../__build__/core/manifest.json'),
        // name: '[hash]',
        // name: 'libraries.8bb04f52c671c168a1f4.js',
      },
    ),
    // new CompressionPlugin({
    //   minRatio: 0.8,
    // }),
    // new CompressionPlugin({
    //   asset: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.(js|html|css|md|ttf|txt|eot|ico|otf|svg|png|gif|woff2|woff|jpeg)$/,
    //   threshold: 10240,
    //   minRatio: 0.7,
    //   deleteOriginalAssets: true,
    // }),
    // new CopyWebpackPlugin([
    //   { from: 'core/src/images/favicon.png', to: 'favicon.png' },
    // ], { copyUnmodified: true }),
    // new BundleAnalyzerPlugin(),
  ],
  externals: [
    'css-loader',
    'postcss-loader',
    'precss',
  ],
});
