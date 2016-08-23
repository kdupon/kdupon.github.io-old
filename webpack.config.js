/**
 * 
 */

const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const qs = require('qs');
const webpack = require('webpack');

// Plugins
const Clean = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Common configuration
const config = require('./webpack.config.json');

console.log('ARGV.WATCH: ' + argv.watch);


var jsLoader = {
  test: /\.js$/,
  exclude: [ /(node_modules|bower_components)(?![/|\\](bootstrap|foundation-sites))/ ],
  loaders: []
};

if (argv.watch) { // '--watch' to add monkey-hot
  jsLoader.loaders.unshift('monkey-hot');
}

/**
 * Loop through webpack entry
 * and add the hot middleware
 * @param  {Object} entry webpack entry
 * @return {Object}       entry with hot middleware
 */
var addHotMiddleware = function(entry) {
  var name,
      results = {},
      hotMiddlewareScript = 'webpack-hot-middleware/client?' + qs.stringify({
        timeout: 20000,
        reload: true
      });

  for (name in entry) {
    if (entry.hasOwnProperty(name)) {
      if (entry[name] instanceof Array !== true) {
        results[name] = [entry[name]];
      } else {
        results[name] = entry[name].slice(0);
      }
      results[name].push(hotMiddlewareScript);
    }
  }
  return results;
}


let webpackConfig = {
    context: path.resolve(__dirname),
    entry: config.entry,
    output: {
        path: path.join(__dirname, config.output.path),
        publicPath: config.output.publicPath,
        filename: config.output.filename
    },
    module: {
        loaders: [
            jsLoader,
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
        ]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, './magic-folder')]
    },
    plugins: [
        new Clean([config.output.path])
    ],
    resolve: {
      extensions: [ '', '.js', '.json' ],
      modulesDirectories: [
        'node_modules',
        'bower_components'
      ]
    },
    stats: {
        colors: true
    }
};

// '--watch' to push additional plugins to webpackConfig
if (argv.watch) {
  webpackConfig.entry = addHotMiddleware(webpackConfig.entry);
  webpackConfig.output.pathinfo = true;
  webpackConfig.debug = true;
  webpackConfig.devtool = '#cheap-module-source-map';
  webpackConfig.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  webpackConfig.plugins.push(new webpack.NoErrorsPlugin());
}

module.exports = webpackConfig;
