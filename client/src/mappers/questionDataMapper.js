function generateQuestionObject(completedQuestionnaire, questionList) {
  return questionList.map((question) => ({
    label: question.label,
    isCompleted: !!completedQuestionnaire[question.label],
  }));
}

function generateCategoryMap(questionList) {
  const categoryMap = {};
  questionList.forEach((question) => {
    if (!categoryMap[question.category]) categoryMap[question.category] = [];
    categoryMap[question.category].push(question);
  });
  return categoryMap;
}

function generateStageData(completedQuestionnaire, questionList) {
  const categoryMap = generateCategoryMap(questionList);

  return Object.keys(categoryMap).map((key) => ({
    category: key,
    questions: generateQuestionObject(completedQuestionnaire, categoryMap[key]),
  }));
}

export default { generateStageData: generateStageData };
