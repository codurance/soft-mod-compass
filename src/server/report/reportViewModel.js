module.exports = reportViewModel;

function ensureKeysValid(categories) {
  const isValidKey = (key) => {
    const hasSpace = key.includes(' ');
    const startWithNumber = key.match(/^\d/);
    const startWithCapitalLetter = key[0] === key[0].toUpperCase();

    return !hasSpace && !startWithNumber && !startWithCapitalLetter;
  };
  const throwError = () => {
    throw 'Category key can not contain space, start with capital letter or start with number';
  };

  for (const category of categories) {
    if (!isValidKey(category.key)) throwError();
    for (const subcategoryKey of category.subcategoryKeys) {
      if (!isValidKey(subcategoryKey)) throwError();
    }
  }
}

const copyOf = (array) => [...array];
const average = (array) => {
  const sumAll = (a, b) => a + b;
  return array.reduce(sumAll) / array.length;
};

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
    const subcategoryKeys = categoryDefinition.subcategoryKeys;

    const subcategories = {};
    for (const subcategoryKey of subcategoryKeys) {
      const answerForSubcategory = answers.shift();
      const questionChoicesForSubcategory = questionChoices.shift();
      const subcategoryScore = calculateScoreForAnswer(
        questionChoicesForSubcategory,
        answerForSubcategory
      );
      subcategories[subcategoryKey] = {
        score: subcategoryScore,
        answer: answerForSubcategory,
      };
    }

    const averageScore = average(
      Object.values(subcategories).map((subcategory) => subcategory.score)
    );

    categories[key] = {
      score: averageScore,
      subcategories,
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
