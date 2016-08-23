/**
 * 
 */

const browserSync = require('browser-sync').create();
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);

const config = require('./webpack.config.json');

browserSync.init(null, {
  files: [ '_site/**/*.*' ],
  port: 3000,
  server: {
    baseDir: './_site'
  },
  middleware: [
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: { colors: true }
    }),
    webpackHotMiddleware(compiler, {
      log: browserSync.notify
    })
  ]
});