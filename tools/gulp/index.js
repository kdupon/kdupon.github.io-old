/* global process */

'use strict'

import { args, start, task, parallel, series, plug, emit } from './gulp'

import {
  build, deploy, scripts, styles
} from './tasks'

import {
  clean
} from './tools'

process.env.GULP_ENV = args.dist || args.prod || args.production ? 'production' : 'development'

process.env.GULP_VERBOSE = args.vet || args.verbose ? true : false

if (process.env.GULP_VERBOSE) {
  plug.util.log(`ENVIRONMENT: ${process.env.GULP_ENV}`)
}

/**
 * Build
 */
task('build', start(clean(['dist']), build))

/**
 * Clean
 */
task('clean', start(clean(['dist', 'tmp'])))

/**
 * Scripts
 */
task('scripts', start(clean(/* glob handled by env */), scripts))

/**
 * Styles
 */
task('styles', start(clean(/* glob handled by env */), styles))

/**
 * Deploy
 */
task('deploy', start(clean, build, deploy))


// listener for persistent tasks (ctrl+c/kill)
process.on('SIGINT', () => {
  if (false) {
    series('cleanup.builder', done => {
      emit('process.exit')
      done()
    })
  }
  emit('process.exit')
  process.exit()
})

// listener for non-persistent tasks
var beforeExitRan = false
process.on('beforeExit', () => {
  if (beforeExitRan) return

  beforeExitRan = true
  emit('process.exit')
})