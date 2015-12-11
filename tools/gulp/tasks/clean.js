'use strict'

import { plug } from '../gulp'

let clean = () => {
  return plug.del(['dist'])
}

export { clean }