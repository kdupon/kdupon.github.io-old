'use strict'

const { dest, parallel, series, src, watch } = require('gulp')
const plug = require('gulp-load-plugins')({ lazy: true })

const _ = require('lodash')

const frontMatter = require('front-matter')

const { isProduction } = require('../facade')

const globals = {}
function getFrontMatter(file) {
   var content = frontMatter(String(file.contents))
   file.contents = new Buffer(content.body)
   return _.assign({}, globals, content.attributes)
}

/**
 *
 */
function partialsSrc() {
  return [
    'src/**/*.html'
  ]
}

/**
 *
 */
function partialsDest() {
  return isProduction() ? 'dist/' : 'tmp/serve/'
}

/**
 *
 */
function buildPartials() {
  return src(partialsSrc())
    .pipe(plug.sourcemaps.init())
    .pipe(plug.data(getFrontMatter))
    .pipe(plug.nunjucks.compile())
    .pipe(plug.sourcemaps.write('.'))
    .pipe(dest(partialsDest()))
}

/**
 *
 */
function checkPartials(callback) {
  callback()
}

/**
 *
 */
function cleanPartials(callback) {
  callback()
}

/**
 *
 */
function watchPartials() {
  return watch(partialsSrc(), parallel(buildPartials, checkPartials))
}

exports.src  = partialsSrc
exports.dest = partialsDest

exports.build = buildPartials
exports.check = checkPartials
exports.clean = cleanPartials
exports.watch = watchPartials
