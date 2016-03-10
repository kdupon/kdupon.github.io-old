'use strict'

const browserSync = require('browser-sync').create()

function startServer() {
  browserSync.instance = browserSync.init({
    files: [
      'tmp/serve/**/*.{css,html,js}'
    ],
    port: 8080,
    server: {
      baseDir: ['tmp/serve', 'src']
    }
  })
}

module.exports = startServer