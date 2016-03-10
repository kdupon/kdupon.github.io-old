/* global process */

'use strict'

const {
  parallel, series, task
} = require('gulp')

const start = require('./start')

const startDevelopmentServer = require('../servers/development')
const startProductionServer = require('../servers/production')

const {
  partials, styles, watch
} = require('./tasks')


/**
 * Build
 */
//task('build', )

/**
 * Clean
 */
//task('clean', )

/**
 * Serve
 */
task('serve', start.development(
  parallel(
    partials.clean, styles.clean
  ),
  parallel(
    partials.build, partials.check,
    styles.build, styles.check
  ),
  parallel(watch, startDevelopmentServer)
))

/**
 * Deploy
 */
//task('deploy', )
