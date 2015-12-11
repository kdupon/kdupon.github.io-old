'use strict'

import { src, dest } from '../gulp'

let build = () => {
  return src('src/index.html').pipe(dest('dist'))
}

export { build }