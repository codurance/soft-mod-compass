Handlebars.registerPartial("subcategory-gauge", "{#asset subcategory-gauge.handlebars @encoding=string}");


/* eslint-disable */
// TODO: Rename to 'categoryScoreClass'
Handlebars.registerHelper("scoreClass", function (score) {
  if (score > 75) return "good";
  if (score >= 50) return "avg";
  return "bad";
});
Handlebars.registerHelper("subcategoryScoreClass", function (score) {
  if (score >= 80) return "good";
  if (score == 60) return "average";
  return "bad";
});
Handlebars.registerHelper("subcategoryIcon", function (score) {
  if (score == 100) return "good-result-icon.png";
  if (score == 80) return "average-high-result-icon.png";
  if (score == 60) return "average-result-icon.png";
  return "bad-result-icon.png";
});


// Temp Hack - Remove when simplifying bar configuration
Handlebars.registerHelper('extractScores', function(categories) {
    return Object.values(categories).map((category) => category.score)
});
/* eslint-enable */
