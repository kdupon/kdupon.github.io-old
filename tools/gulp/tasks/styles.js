/* global process */

'use strict'

import path from 'path'

import autoprefixer from 'autoprefixer'
import mq4HoverShim from 'mq4-hover-shim'

import { src, dest, plug, handleError } from '../gulp'

import { isProduction, randomString } from '../tools'

const autoprefixerAlwaysEnabled = true;

const pkg = require(path.join(process.cwd(), 'package.json'))

const headerTemplate = [
  '/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n')

const stylesSrc = [
  'src/**/*.scss'
]

// https://github.com/twbs/bootstrap/blob/v4-dev/Gruntfile.js#L24
const autoprefixerSettings = {
  browsers: [
    'Chrome >= 35',
    'Edge >= 12',
    'Explorer >= 9',
    'iOS >= 8',
    'Safari >= 8',
    'Android 2.3',
    'Android >= 4',
    'Opera >= 12'
  ]
}

const scssLintSettings = {
  bundleExec: true, //https://github.com/juanfran/gulp-scss-lint#bundleexec
  config: path.join(process.cwd(), 'src/library/styles/.scss-lint.yml')
}

let lintStyles = () => {
  return src(stylesSrc)
    .pipe(plug.scssLint(scssLintSettings)).on('error', err => handleError('scss-lint', err))
}

let styles = () => {

  let postcssPlugins = [
    mq4HoverShim.postprocessorFor({ hoverSelectorPrefix: '.ui-true-hover ' })
  ]

  if (isProduction() || autoprefixerAlwaysEnabled) {
    postcssPlugins.push(autoprefixer(autoprefixerSettings))
  }

  return src(stylesSrc)
    .pipe(process.env.GULP_VERBOSE ? plug.debug() : plug.util.noop())
    .pipe(plug.sourcemaps.init())
    .pipe(plug.sass()).on('error', err => handleError('sass', err))
    .pipe(plug.postcss(postcssPlugins))
    .pipe(isProduction() ? plug.csso() : plug.util.noop())
    .pipe(isProduction() ? plug.header(headerTemplate, { pkg }) : plug.util.noop())
    .pipe(plug.flatten())
    .pipe(isProduction() ? plug.rename({ extname: `.min.css?v${pkg.version}` }) : plug.util.noop())
    .pipe(plug.sourcemaps.write('.'))
    .pipe(isProduction() ? dest('dist/styles') : dest('tmp/serve/styles'))
}

export { stylesSrc, lintStyles, styles }