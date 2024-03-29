const {
  uploadReportToHubspot,
  submitHubspotForm,
} = require('../report/hubspot/uploadToHubspot');

let jsReportService = require('../jsReportService');

const { localMode } = require('../config');
const fs = require('fs');
const path = require('path');

async function submitSurvey(body) {
  const jsReportTemplate = {
    name: body.user.language === 'es' ? 'Compass-ES' : 'Compass-EN',
    engine: 'handlebars',
    recipe: 'chrome-pdf',
  };

  const pdf = await jsReportService.renderPdf(jsReportTemplate, body);

  if (localMode) {
    savePdfLocally(pdf.content);
    return {
      status: 'ok',
      message: 'Your pdf was generated locally /server/tmp/test.pdf file',
    };
  } else {
    const pdfLink = await uploadReportToHubspot(pdf.content, body.user);
    const submittedUser = await submitHubspotForm(
      pdfLink,
      body.user,
      body.categories
    );
    return { status: 'ok', ...submittedUser, pdfUrl: pdfLink };
  }
}

function savePdfLocally(pdfBuffer) {
  const pdfPath = path.join(__dirname, `../../../tmp/test.pdf`);
  const route = path.join(__dirname, `../../../tmp`);

  if (!fs.existsSync(route)) {
    fs.mkdirSync(route);
  }

  fs.writeFileSync(pdfPath, pdfBuffer, (err) =>
    console.log('Error generating the PDF ', err.message)
  );
}

module.exports = { submitSurvey };
