/* global process */

'use strict'

import { plug } from '../gulp'

let clean = (glob) => {
  return () => {
    if (!glob) {
      glob = process.env.GULP_ENV === 'production' ? ['dist'] : ['tmp']
    }

    if (process.env.GULP_VERBOSE) {
      plug.util.log(`cleaning ${glob}`)
    }
    
    return plug.del(glob)
  }
}

export { clean }