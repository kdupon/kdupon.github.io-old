/* global process */
'use strict'

let isProduction = () => {
  return process.env.GULP_ENV === 'production'
}

export { isProduction }