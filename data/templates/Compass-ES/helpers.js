Handlebars.registerPartial("gauge-subcategory", "{#asset gauge-subcategory.handlebars @encoding=string}");
Handlebars.registerPartial("gauge-assessment", "{#asset gauge-assessment.handlebars @encoding=string}");


/* eslint-disable */
Handlebars.registerHelper("categoryScoreClass", function (score) {
  if (score > 75) return "good";
  if (score >= 50) return "avg";
  return "bad";
});
Handlebars.registerHelper("gaugeScoreClass", function (score) {
  if (score >= 80) return "good";
  if (score >= 60) return "average";
  return "bad";
});
Handlebars.registerHelper("scoreIconSubcategory", function (score) {
  if (score == 100) return "good";
  if (score == 80) return "average-high";
  if (score == 60) return "average";
  return "bad";
});

Handlebars.registerHelper("showAssessmentWarningBox", (score) => score < 50 );

/* eslint-enable */
