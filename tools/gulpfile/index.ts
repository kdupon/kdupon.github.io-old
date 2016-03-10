/**
 *
 */

const {
  task, parallel
} = require('gulp')

function serve() {

}

module.exports = CONFIG => {
  task('serve', parallel(done => done()))
}

export {
  serve
}