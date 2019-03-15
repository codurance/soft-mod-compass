module.exports = reportViewModel

function reportViewModel (loadContent, categories, questionChoices, answers, loadStaticContent) {
  const categoriesWithContentAndScore = createCategoriesFrom(categories, questionChoices, answers)
    .map(addScore)
    .map(x => addStaticContent(loadStaticContent, x))
    .map(x => addContent(loadContent, x))

  const scores = categoriesWithContentAndScore.map(c => c.score)

  setPageNumbers(categoriesWithContentAndScore)

  return {
    scores,
    summaryRadial: {
      scores,
      labels: categoriesWithContentAndScore.map(c => c.name)
    },
    categories: categoriesWithContentAndScore.map(({
      name,
      content,
      staticContent,
      score,
      subCategoryNames,
      subCategoryScores
    }) => (
      { name,
        content,
        staticContent,
        score,
        subCategoryLabels: subCategoryNames,
        subCategoryLabel1: subCategoryNames[0],
        subCategoryLabel2: subCategoryNames[1],
        subCategoryLabel3: subCategoryNames[2],
        subCategoryLabel4: subCategoryNames[3],
        subCategoryScores
      }))
  }
}

function createCategoriesFrom (categories, allSelectableChoices, allChosenAnswers) {
  return categories.map((category, index) => {
    const numberOfQuestionsInCategory = 4
    const offset = index * numberOfQuestionsInCategory
    const categoryChoices = allSelectableChoices.slice(offset, offset + numberOfQuestionsInCategory)
    const categoryAnswers = allChosenAnswers.slice(offset, offset + numberOfQuestionsInCategory)

    return Object.assign({}, category, { choices: categoryChoices, answers: categoryAnswers })
  })
}

function addScore (category) {
  const scores = calculateScoreFor(category)
  return Object.assign({}, category, scores)
}

function calculateScoreFor ({ choices, answers }) {
  const subCategoryScores = choices
    .map((choiceList, index) => calculateScoreForAnswer(choiceList, answers[index]))

  return {
    score: subCategoryScores.reduce((a, b) => a + b) / answers.length,
    subCategoryScores
  }
}

function calculateScoreForAnswer (choices, answer) {
  return 100 - choices.indexOf(answer) * 20
}

function addContent (loadContent, category) {
  const content = loadContent(category.name, category.score)
  return Object.assign({}, category, { content })
}

function addStaticContent (loadStaticContent, category) {
  const staticContent = loadStaticContent(category.name)
  return Object.assign({}, category, { staticContent })
}

function setPageNumbers (categoriesWithContentAndScore) {
  let pageNumber = 2
  let i = 0
  for (i = 0; i < categoriesWithContentAndScore.length; i++) {
    const category = categoriesWithContentAndScore[i]
    if (category.content && category.content.page1) {
      pageNumber++
      category.content.page1PageNumber = pageNumber
    } else {
      category.content.page1PageNumber = null
    }
    if (category.content && category.content.page2) {
      pageNumber++
      category.content.page2PageNumber = pageNumber
    } else {
      category.content.page2PageNumber = null
    }
  }
}
