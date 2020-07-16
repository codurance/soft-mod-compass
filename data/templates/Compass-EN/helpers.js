/* eslint-disable */
Handlebars.registerHelper("scoreClass", function (score) {
  if (score > 75) return "good";
  if (score >= 50) return "avg";
  return "bad";
});


// Temp Hack - Remove when simplifying bar configuration
Handlebars.registerHelper('extractScores', function(categories) {
    return Object.values(categories).map((category) => category.score)
});
/* eslint-enable */
