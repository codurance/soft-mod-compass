module.exports = reportViewModel

function reportViewModel (loadContent, categories, questionChoices, answers) {
  const categoriesWithContentAndScore = createCategoriesFrom(categories, questionChoices, answers)
    .map(addScore)
    .map(x => addContent(loadContent, x))

  const scores = categoriesWithContentAndScore.map(c => c.score)

  return {
    scores,
    summaryRadial: {
      scores,
      labels: categoriesWithContentAndScore.map(c => c.name)
    },
    categories: categoriesWithContentAndScore.map(({
      name,
      content,
      score,
      subCategoryNames,
      subCategoryScores
    }) => (
      { name,
        content,
        score,
        subCategoryLabels: subCategoryNames,
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
    .map((choiceList, index) => (choiceList.indexOf(answers[index]) + 1) * 20)

  return {
    score: subCategoryScores.reduce((a, b) => a + b) / answers.length,
    subCategoryScores
  }
}

function addContent (loadContent, category) {
  const content = loadContent(category.name, category.score)
  return Object.assign({}, category, { content })
}
