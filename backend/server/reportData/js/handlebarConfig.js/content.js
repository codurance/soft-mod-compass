/* eslint-disable */
Handlebars.registerPartial(
  'gauge-subcategory',
  '{#asset gauge-subcategory.handlebars @encoding=string}'
);
Handlebars.registerPartial(
  'gauge-assessment',
  '{#asset gauge-assessment.handlebars @encoding=string}'
);
Handlebars.registerPartial(
  'gauge-summary',
  '{#asset gauge-summary.handlebars @encoding=string}'
);
const { enLabels, esLabels } = require('translations');

/** Backgrounds for each category depending on score **/
Handlebars.registerHelper('categoryScoreClass', function (score) {
  if (score >= 75) return 'good';
  if (score >= 50) return 'average';
  return 'bad';
});

/** Gauges **/
Handlebars.registerHelper('translate', function (answer, language) {
  if (!language) return answer;
  if (language === 'es') return esLabels[answer];
  else return enLabels[answer];
});
Handlebars.registerHelper('gaugeCategoryScoreClass', function (score) {
  if (score > 50) return 'good';
  if (score > 25) return 'average';
  if (score <= 25) return 'bad';
  throw `Invalid category score: ${score}`;
});
Handlebars.registerHelper('gaugeCategoryScoreIcon', function (score) {
  if (score > 75) return 'good';
  if (score > 50) return 'average-high';
  if (score > 25) return 'average';
  if (score <= 25) return 'bad';
  throw `Invalid category score: ${score}`;
});
Handlebars.registerHelper('gaugeSubcategoryScoreClass', function (score) {
  if (score == 100) return 'good';
  if (score == 80) return 'good';
  if (score == 60) return 'average';
  if (score == 40) return 'bad';
  if (score == 20) return 'bad';
  throw `Invalid subcategory score: ${score}`;
});
Handlebars.registerHelper('gaugeSubcategoryScoreIcon', function (score) {
  if (score == 100) return 'good';
  if (score == 80) return 'average-high';
  if (score == 60) return 'average';
  if (score == 40) return 'bad';
  if (score == 20) return 'bad';
  throw `Invalid subcategory score: ${score}`;
});
Handlebars.registerHelper('showAssessmentWarningBox', (score) => score < 50);

Handlebars.registerHelper('currentDate', function () {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
});
/* eslint-enable */
