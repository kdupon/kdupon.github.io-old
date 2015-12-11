'use strict'

import { src, plug } from '../gulp'

const CNAME = 'katedupon.com'

const deployOptions = {
  branch: 'master'
}

let deploy = () => {
  return src('dist/**/*')
    .pipe(plug.file('CNAME', CNAME))
    .pipe(plug.ghPages(deployOptions))
}

export { deploy }