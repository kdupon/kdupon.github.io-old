/* global process */
'use strict'

import gulp from 'gulp'
import load from 'gulp-load-plugins'

import through from 'through2'
import yargs from 'yargs'

const pluginPatterns = [
  'gulp-*', 'gulp.*', 'del'
]

// start task
export const start = gulp.series.bind(gulp, done => {
  console.log('todo check task environment')
  done()
})

export const args = yargs.argv

// rebind gulp for a more meaningful syntax
export const dest     = gulp.dest.bind(gulp)
export const parallel = gulp.parallel.bind(gulp)
export const series   = gulp.series.bind(gulp)
export const src      = gulp.src.bind(gulp)
export const task     = gulp.task.bind(gulp)
export const tree     = gulp.tree.bind(gulp)
export const watch    = gulp.watch.bind(gulp)

// event bindings
export const on   = gulp.on.bind(gulp)
export const emit = gulp.emit.bind(gulp)

// 3rd party plugins
export const plug = load({ lazy: true, pattern: pluginPatterns })

// log from inside a pipe block
export const log = (msg) => {
  plug.util.log(msg)
  return through.obj()
}

export const handleError = (taskName, error) => {
  let message = new plug.util.PluginError(taskName, error.messageFormatted).toString();

  process.stderr.write(`${message}\n`);

  if (process.env.GULP_ENV === 'production') {
    process.exit(1)
  }

  this.emit('end');
}