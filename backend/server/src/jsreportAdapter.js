const jsreport = require('jsreport');

module.exports = async (jsReportTemplate, body) => {
  return await jsreport.render({
    template: jsReportTemplate,
    data: body,
  });
};
