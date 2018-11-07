module.exports = surveyResults

function surveyResults (categories, questionChoices, answers) {
  const categoriesWithContentAndScore = createCategoriesFrom(categories, questionChoices, answers)
    .map(addScore)
    .map(addContent)

  return {
    'scores': categoriesWithContentAndScore.map(c => c.score),
    'categories': categoriesWithContentAndScore.map(({ name, content, score }) => ({ name, content, score }))
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
  return Object.assign({}, category, { score: calculateScoreFor(category) })
}

function calculateScoreFor ({ choices, answers }) {
  return choices
    .map((choiceList, index) => (choiceList.indexOf(answers[index]) + 1) * 20)
    .reduce((a, b) => a + b) / answers.length
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
