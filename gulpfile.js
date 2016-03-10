/**
 * Gulpfile configuration and bootstrap.
 */

'use strict'
//const enviroment = require('./tmp/build/tools/utilities/environment')

const DEBUG_CONFIGURATION = {
  BSYNC: {
    server: {
      baseDir: ['']
    }
  },
  SCRIPTS: {
    SRC: ['src/assets/**/*.ts'],
    WATCH: ['src/assets/**/*.ts'],
    DEST: ['_site'],
    BUNDLES: [
      { MAIN: 'tmp/serve/assets/atomic.js', DEST: 'src/assets/atomic.bundle.js'}
    ],
  },
  STYLES: {
    SRC: [''],
    WATCH: [''],
    DEST: ['']
  }
}

const RELEASE_CONFIGURATION = {
}

const CONFIG = DEBUG_CONFIGURATION
// if (environment.is('production')) {
//   config = RELEASE_CONFIGURATION
// }

require('./tmp/build/tools/gulpfile')(CONFIG)
