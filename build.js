#! /usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const printBuildError = require('react-dev-utils/printBuildError');
const configFunction = require('./webpack/webpack.prod.config');

const { printFileSizesAfterBuild } = FileSizeReporter;
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;
const paths = {
  appPackageJson: path.resolve('./', 'package.json'),
  publicUrl: 'http://localhost:8088',
  appBuild: path.resolve('./', '__build__'),
};

if (!argv.config) {
  console.error('config file not specified');
  process.exit(1);
}

// eslint-disable-next-line import/no-dynamic-require
const configs = require(argv.config);

if (!configs) {
  console.error('Check your configs, most likely its not exported');
  process.exit(1);
}
console.log(configs);
const config = configFunction(configs);

// Create the production build and print the deployment instructions.
function build(previousFileSizes = {
  root: path.resolve('./__build__', (configs.buildFolder || 'default')),
  sizes: {},
  asset: { name: 'default' },
}) {
  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
            'Most CI servers set it automatically.\n',
          ),
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }
      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      });
    });
  });
}

build()
  .then(({ stats, previousFileSizes, warnings }) => {
    if (warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.\n'));
      console.log(warnings.join('\n\n'));
      console.log(`
      Search for the ${chalk.underline(chalk.yellow('keywords'))} to learn more about each warning.`);
      console.log(`To ignore, add ${chalk.cyan('// eslint-disable-next-line')} to the line before.
        `);
    } else {
      console.log(chalk.green('Compiled successfully.\n'));
    }
    console.log('previousFileSizes', previousFileSizes);
    printFileSizesAfterBuild(
      stats,
      previousFileSizes,
      paths.appBuild,
      WARN_AFTER_BUNDLE_GZIP_SIZE,
      WARN_AFTER_CHUNK_GZIP_SIZE,
      false,
    );

    const directories = fs.readdirSync(paths.appBuild)
      .filter(dir => fs.statSync(path.join(paths.appBuild, dir)).isDirectory());

    const jsons = {};
    directories.forEach(i => {
      jsons[i] = JSON.parse(
        fs.readFileSync(path.join(paths.appBuild, i, 'manifest.json'), 'utf-8'),
      );
    });
    fs.writeFileSync(path.join(paths.appBuild, 'manifest.json'), JSON.stringify(jsons));
    const html = fs.readFileSync(path.join(paths.appBuild, 'core', 'index.html'));
    fs.writeFileSync(path.join(paths.appBuild, 'index.html'), html);

  }, (err) => {
    console.log(chalk.red('Failed to compile.\n'));
    printBuildError(err);
    process.exit(1);
  });