module.exports = reportViewModel;

function ensureKeysValid(categories) {
  for (const category of categories) {
    if (category.key.includes(' ')) {
      throw 'Category key can not contain space';
    }
  }
}
const copyOf = (array) => [...array];

function mapUserInfo(userDetails) {
  const userProperty = (propertyName) =>
    userDetails.values.find((property) => property.name === propertyName).value;

  return {
    firstName: userProperty('firstname'),
    lastName: userProperty('lastname'),
    company: userProperty('company'),
    email: userProperty('email'),
  };
}

function computeScoresForCategories(
  categoryDefinitions,
  answers,
  questionChoices
) {
  answers = copyOf(answers);
  questionChoices = copyOf(questionChoices);

  const categories = {};

  for (const categoryDefinition of categoryDefinitions) {
    const key = categoryDefinition.key;
    const subcategories = categoryDefinition.subcategoryNames;
    const subcategoryScores = [];

    for (const _ of subcategories) {
      const answerForSubcategory = answers.shift();
      const questionChoicesForSubcategory = questionChoices.shift();
      const subcategoryScore = calculateScoreForAnswer(
        questionChoicesForSubcategory,
        answerForSubcategory
      );
      subcategoryScores.push(subcategoryScore);
    }

    const averageScore =
      subcategoryScores.reduce((a, b) => a + b) / subcategoryScores.length;

    categories[key] = {
      score: averageScore,
      subcategoryScores,
    };
  }

  return categories;
}

function reportViewModel(
  categoryDefinitions,
  questionChoices,
  answers,
  userDetails
) {
  ensureKeysValid(categoryDefinitions);

  return {
    user: mapUserInfo(userDetails),
    categories: computeScoresForCategories(
      categoryDefinitions,
      answers,
      questionChoices
    ),
  };
}

function calculateScoreForAnswer(choices, answer) {
  return 100 - choices.indexOf(answer) * 20;
}
