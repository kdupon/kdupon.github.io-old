'use strict'

function isProduction() {
  const env = (process.env.GULP_ENV === 'production' || process.env.NODE_ENV === 'production')
  console.log('env is prod: ', env)
  return env
}

exports.isProduction = isProduction