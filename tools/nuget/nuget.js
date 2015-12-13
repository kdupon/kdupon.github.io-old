/* global __dirname */
/* global process */

'use strict'

var fs = require('fs')
var path = require('path')
var os = require('os')

var _ = require('lodash')

var nuspecPath = path.join(__dirname, `./os_nuget_specs/${os.platform()}.nuspec`)

var nuspec = fs.readFileSync(nuspecPath, 'utf8')
var baseDir = path.dirname(nuspec)

var npmPkg = require(path.join(process.cwd(), 'package.json'))

var pkg = {
  id: npmPkg.name,
  version: npmPkg.version,
  authors: npmPkg.contributors.join(', '),
  owners: npmPkg.contributors.join(', '),
  licenseUrl: "",
  projectUrl: npmPkg.repository.url || "",
  iconUrl: "",
  requireLicenseAcceptance: false,
  description: npmPkg.description,
  releaseNotes: "todo",
  copyright: "Copyright 2015",
  tags: npmPkg.keywords.join(' ')
}

if (!pkg.id || !pkg.version || !pkg.authors || !pkg.description) {
  throw new Error('NuGet Package requires id, version, authors and description properties.')
}
nuspec = _.template(nuspec)({ pkg: pkg })
fs.writeFile('Package.nuspec', nuspec);