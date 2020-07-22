Handlebars.registerPartial("gauge-subcategory", "{#asset gauge-subcategory.handlebars @encoding=string}");
Handlebars.registerPartial("gauge-assessment", "{#asset gauge-assessment.handlebars @encoding=string}");


/* eslint-disable */
// TODO: Rename to 'categoryScoreClass'
Handlebars.registerHelper("scoreClass", function (score) {
  if (score > 75) return "good";
  if (score >= 50) return "avg";
  return "bad";
});
Handlebars.registerHelper("gaugeScoreClass", function (score) {
  if (score >= 80) return "good";
  if (score >= 60) return "average";
  return "bad";
});
Handlebars.registerHelper("subcategoryIcon", function (score) {
  if (score == 100) return "good-result-icon.png";
  if (score == 80) return "average-high-result-icon.png";
  if (score == 60) return "average-result-icon.png";
  return "bad-result-icon.png";
});

Handlebars.registerHelper("showAssessmentWarningBox", (score) => score < 50 );


// Temp Hack - Remove when simplifying bar configuration
Handlebars.registerHelper('extractScores', function(categories) {
    return Object.values(categories).map((category) => category.score)
});
/* eslint-enable */
