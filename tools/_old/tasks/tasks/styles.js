'use strict'

const { dest, parallel, series, src, watch } = require('gulp')
const plug = require('gulp-load-plugins')({ lazy: true })

const { isProduction } = require('../facade')

/**
 *
 */
function stylesSrc() {
  return [
    'src/**/*.scss'
  ]
}

/**
 *
 */
function stylesDest() {
  return isProduction() ? 'dist/' : 'tmp/serve/'
}

/**
 *
 */
function buildStyles() {
  return src(stylesSrc())
    .pipe(plug.sourcemaps.init())
    .pipe(plug.sass())
    .pipe(isProduction() ? plug.sass() : plug.util.noop())
    .pipe(plug.sourcemaps.write('.'))
    .pipe(dest(stylesDest()))
}

/**
 *
 */
function checkStyles(callback) {
  callback()
}

/**
 *
 */
function cleanStyles(callback) {
  callback()
}

/**
 *
 */
function watchStyles() {
  return watch(stylesSrc(), parallel(buildStyles, checkStyles))
}

exports.src  = stylesSrc
exports.dest = stylesDest

exports.build = buildStyles
exports.check = checkStyles
exports.clean = cleanStyles
exports.watch = watchStyles
