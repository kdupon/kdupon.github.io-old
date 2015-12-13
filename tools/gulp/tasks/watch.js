'use strict'

import { parallel, series, watch as observe, on } from '../gulp'

import { stylesSrc, lintStyles, styles } from './styles'

let watch = (done) => {
  observe(stylesSrc, parallel(lintStyles, styles))

  on('process.exit', () => done())
}

export { watch }