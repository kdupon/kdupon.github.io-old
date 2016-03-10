'use strict'

const gulp = require('gulp')

function diagnostics(nextTask) {
  console.log('TODO(): diagnostics')
  nextTask()
}

function start(...tasks) {
  return gulp.series.call(gulp, diagnostics, tasks)
}

start.development = function(...tasks) {
  return gulp.series.call(
    gulp,
    function settingEnvToDevelopment(nextTask) {
      process.env.GULP_ENV = 'development'
      process.env.NODE_ENV = 'development'
      nextTask()
    },
    tasks
  )
}

start.production = function(...tasks) {
  return gulp.series.call(
    gulp,
    function settingEnvToProduction(nextTask) {
      process.env.GULP_ENV = 'production'
      process.env.NODE_ENV = 'production'
      nextTask()
    },
    tasks
  )
}

module.exports = start