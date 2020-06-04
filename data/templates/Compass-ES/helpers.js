/* eslint-disable */
Handlebars.registerHelper("scoreClass", function (score) {
  if (score > 75) return "good";
  if (score >= 50) return "avg";
  return "bad";
});
/* eslint-enable */
