const jsreport = require('jsreport');

module.exports = async (jsReportTemplate, body) => {
  await jsreport.init();
  return await jsreport.render({
    template: jsReportTemplate,
    data: body,
  });
};
