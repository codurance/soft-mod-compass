const fs = require('fs')

const loadContentFor = (categoryName) => {
  try {
    const content = fs.readFileSync(fileNameFor(categoryName), 'UTF-8')
    const contentWithNoLineBreaks = '<p>' + content.replace(/\n/g, ' ').replace(/<p>/g, '').replace(/<\/p>/g, '') + '</p>'
    return {
      content,
      contentWithNoLineBreaks
    }
  } catch (e) {
    return `No content available for ${categoryName}`
  }
}

function fileNameFor (categoryName) {
  let safeCategoryName = categoryName.toLowerCase().replace(/ /g, '_').replace('-', '_')
  return `${__dirname}/../../../data/staticContent/${safeCategoryName}_headerContent.html`
}

module.exports = loadContentFor
