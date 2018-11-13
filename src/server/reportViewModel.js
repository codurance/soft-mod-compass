module.exports = reportViewModel

function reportViewModel (categories, questionChoices, answers) {
  const categoriesWithContentAndScore = createCategoriesFrom(categories, questionChoices, answers)
    .map(addScore)
    .map(addContent)

  return {
    summaryRadial: {
      scores: categoriesWithContentAndScore.map(c => c.score),
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

function addContent (category) {
  let content
  if (category.score < 33) {
    content = category.low
  } else if (category.score < 66) {
    content = category.medium
  } else {
    content = category.high
  }

  return Object.assign({}, category, { content })
}
