/* eslint-disable */
Handlebars.registerPartial("gauge-subcategory", "{#asset gauge-subcategory.handlebars @encoding=string}");
Handlebars.registerPartial("gauge-assessment", "{#asset gauge-assessment.handlebars @encoding=string}");
Handlebars.registerPartial("gauge-summary", "{#asset gauge-summary.handlebars @encoding=string}");


Handlebars.registerHelper("categoryScoreClass", function (score) {
  if (score > 75) return "good";
  if (score >= 50) return "average";
  return "bad";
});
Handlebars.registerHelper("gaugeScoreClass", function (score) {
  if (score >= 80) return "good";
  if (score >= 60) return "average";
  return "bad";
});
Handlebars.registerHelper("gaugeSummaryScoreClass", function (score) {
  if (score > 75) return "good";
  if (score >= 50) return "average";
  return "bad";
});

Handlebars.registerHelper("scoreIconSubcategory", function (score) {
  if (score == 100) return "good";
  if (score == 80) return "average-high";
  if (score == 60) return "average";
  return "bad";
});
Handlebars.registerHelper("scoreIconSummary", function (score) {
  if (score > 75) return "good";
  if (score >= 50) return "average";
  return "bad";
});

Handlebars.registerHelper("showAssessmentWarningBox", (score) => score < 50 );

Handlebars.registerHelper("currentDate", function () {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
});
/* eslint-enable */