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

function mapToUserDetails(formSubmission) {
  function titleCase(str) {
    const names = str.toLowerCase().split(' ');
    for (let i = 0; i < names.length; i++) {
      names[i] = names[i][0].toUpperCase() + names[i].slice(1);
    }
    return names.join(' ');
  }

  return {
    firstName: titleCase(formSubmission.firstName),
    lastName: titleCase(formSubmission.lastName),
    company: titleCase(formSubmission.company),
    email: formSubmission.email,
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
  formSubmisison
) {
  ensureKeysValid(categoryDefinitions);

  return {
    user: mapToUserDetails(formSubmisison),
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
