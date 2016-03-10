'use strict'

const browserSync = require('browser-sync').create()

function startServer() {
  browserSync.instance = browserSync.init({
    files: [
      'dist/**/*.{css,html,js}'
    ],
    port: 8080,
    server: {
      baseDir: ['dist']
    }
  })
}

module.exports = startServer