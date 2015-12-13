/* global process */

'use strict'

import path from 'path'

import { series, src, dest, plug } from 'gulp'

const pkg = require(path.join(process.cwd(), 'package.json'))

const headerTemplate = [
  '/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n')

const moduleSrc = 'src/app/index.js'
const moduleDest = process.env.GULP_ENV === 'production' ? `dist/scripts/index.min.js?v${pkg.version}` : 'tmp/serve/scripts/index.js'


let scripts = () => {
  return series(bundle(moduleSrc, moduleDest), () => {
    return src([moduleDest])
      .pipe(plug.uglify())
      .pipe(plug.header(headerTemplate, { pkg }))
      .pipe(process.env.GULP_ENV === 'production' ? dest('dist/scripts') : dest('tmp/serve/scripts'))
  })

  function bundle(moduleSrc, moduleDest) {
    return (done) => {
      const Builder = require('jspm').Builder
      const builder = new Builder()

      builder
        .buildStatic(moduleSrc, moduleDest)
        .then(() => done()).catch((err) => console.error(err))
    }
  }
}

export { scripts }