'use strict'

var fs = require('fs')
var conventionalChangelog = require('conventional-changelog')

const changelogStream = fs.createWriteStream('CHANGELOG.md')

// https://github.com/ajoslin/conventional-changelog/blob/master/conventions/angular.md
var config = {
  preset: 'angular', releaseCount: 1,
}

function changelog() {
  return conventionalChangelog(config).pipe(changelogStream)
}

//export { changelog }