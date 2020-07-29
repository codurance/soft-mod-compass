const reportViewModel = require('./reportViewModel');

const roundToNearestQuarter = (score) => {
  return Math.round(score / 25) * 25;
};

const roundCategoryScore = (viewModel, categoryKey) => {
  const categoryScore = viewModel.categories[categoryKey].score;
  const roundedCategoryScore = roundToNearestQuarter(categoryScore);
  viewModel.categories[categoryKey].score = roundedCategoryScore;
};

const roundCategoryScoresToNearestQuarter = (reportViewModel) => {
  reportViewModel = { ...reportViewModel };

  Object.keys(reportViewModel.categories).forEach((categoryKey) => {
    roundCategoryScore(reportViewModel, categoryKey);
  });

  return reportViewModel;
};

module.exports = roundCategoryScoresToNearestQuarter;
