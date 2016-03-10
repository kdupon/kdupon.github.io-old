'use strict'

const partials = require('./partials')
const styles = require('./styles')

function watch() {
  partials.watch()
  styles.watch()
}

module.exports = watch
