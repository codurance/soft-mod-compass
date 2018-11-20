const { readFileSync } = require('fs')

module.exports = (path) => {
  return readFileSync(path, 'utf8')
}
