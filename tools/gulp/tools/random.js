'use strict'

/**
 * Random String Generator
 */
export function randomString(charLength) {
  let str = '', charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

  for (var i = 0; i < charLength; i++) {
    str += charSet.charAt(Math.floor(Math.random() * charSet.length))
  }

  return str
}