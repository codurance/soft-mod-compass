const fs = require('fs')
const urAverage = 33
const urGood = 75

const loadContentFor = (categoryName, score) => {
  let page1 = null
  let page2 = null

  const loadContentResultPage1 = loadContentForPageNumber(categoryName, score, 1)
  if (loadContentResultPage1.hasValue === true) {
    page1 = loadContentResultPage1.result
  } else {
    page1 = `No content available for ${categoryName}`
  }

  const loadContentResultPage2 = loadContentForPageNumber(categoryName, score, 2)
  if (loadContentResultPage2.hasValue) {
    page2 = loadContentResultPage2.result
  }

  return { page1, page2 }
}

const loadContentForPageNumber = (categoryName, score, pageNumber) => {
  try {
    const result = fs.readFileSync(fileNameFor(categoryName, levelFor(score), pageNumber), 'UTF-8')
    return { hasValue: true, result }
  } catch (e) {
    return { hasValue: false, result: null }
  }
}

function fileNameFor (categoryName, level, pageNumber) {
  let safeCategoryName = categoryName.toLowerCase().replace(/ /g, '_').replace('-', '_')
  return `${__dirname}/../../../data/content/${safeCategoryName}_${level}_page${pageNumber}.html`
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
