module.exports = reportViewModel

function reportViewModel (categories, questionChoices, answers, userDetails) {
  const categoriesWithContentAndScore = createCategoriesFrom(categories, questionChoices, answers)
    .map(addScore)

  const scores = categoriesWithContentAndScore.map(c => c.score)
  const userData = userDetails

  console.log(`ABOUT TO MAKE VIEW MODAL JSON RESULTS:
    userData: ${userData}`)

  const jsonResults = {
    userData,
    scores,
    summaryRadial: {
      scores,
      labels: categoriesWithContentAndScore.map(c => c.name)
    },
    categories: categoriesWithContentAndScore.map(({
      name,
      score,
      subCategoryNames,
      subCategoryScores
    }) => (
      { name,
        score,
        subCategoryLabels: subCategoryNames,
        subCategoryLabel1: subCategoryNames[0],
        subCategoryLabel2: subCategoryNames[1],
        subCategoryLabel3: subCategoryNames[2],
        subCategoryLabel4: subCategoryNames[3],
        subCategoryScores
      }))
  }
  return jsonResults
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
