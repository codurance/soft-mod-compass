const fs = require('fs')

const loadContentFor = (categoryName) => {
  try {
    return fs.readFileSync(fileNameFor(categoryName), 'UTF-8')
  } catch (e) {
    return `No content available for ${categoryName}`
  }
}

function fileNameFor (categoryName) {
  let safeCategoryName = categoryName.toLowerCase().replace(/ /g, '_').replace('-', '_')
  return `${__dirname}/../../../data/content/${safeCategoryName}_headerContent}.html`
}

module.exports = loadContentFor
