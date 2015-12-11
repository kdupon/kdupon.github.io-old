'use strict'

import { start, task, parallel, series } from './gulp'

import {
  build, clean, deploy
} from './tasks'

/**
 * Build
 */
task('build', start(clean, build))

/**
 * Clean
 */
task('clean', start(clean))

/**
 * Deploy
 */
task('deploy', start(clean, build, deploy))