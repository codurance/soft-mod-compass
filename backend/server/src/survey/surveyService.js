const {
  uploadReportToHubspot,
  submitHubspotForm,
} = require('../report/hubspot/uploadToHubspot');
const generateReport = require('../jsreportAdapter');
const fs = require('fs');
const path = require('path');
const { localMode } = require('../config');
const {
  updateSurveyToSucceedState,
  getSurveyById,
} = require('./surveyRepository');

async function proccessSurvey(body) {
  const jsReportTemplate = {
    name: body.user.language === 'es' ? 'Compass-ES' : 'Compass-EN',
    engine: 'handlebars',
    recipe: 'chrome-pdf',
  };
  const pdf = await generateReport(jsReportTemplate, body);

  if (localMode) {
    generatePdfLocally(pdf.content);
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

async function reProccessSurvey(id) {
  try {
    const survey = await getSurveyById(id);
    await proccessSurvey(survey.bodyRequest);
    await updateSurveyToSucceedState(id);
  } catch (err) {
    throw new err();
  }
}

function generatePdfLocally(pdfBuffer) {
  const pdfPath = path.join(__dirname, `../../../tmp/test.pdf`);
  const route = path.join(__dirname, `../../../tmp`);

  if (!fs.existsSync(route)) {
    fs.mkdirSync(route);
  }

  fs.writeFileSync(pdfPath, pdfBuffer, (err) =>
    console.log('Error generating the PDF', err.message)
  );
}

module.exports = {
  proccessSurvey,
  reProccessSurvey,
};
