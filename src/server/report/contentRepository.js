const fs = require('fs')
const urAverage = 33
const urGood = 75

const loadContentFor = (categoryName, score) => {
  try {
    return fs.readFileSync(fileNameFor(categoryName, levelFor(score)), 'UTF-8')
  } catch (e) {
    return `No content available for ${categoryName}`
  }
}

function fileNameFor (categoryName, level) {
  let safeCategoryName = categoryName.toLowerCase().replace(/ /g, '_').replace('-', '_')
  return `${__dirname}/../../../data/content/${safeCategoryName}_${level}.html`
}

function levelFor (score) {
  if (score < urAverage) {
    return 'bad'
  } else if (score < urGood) {
    return 'ave'
  } else {
    return 'good'
  }
}

module.exports = loadContentFor
