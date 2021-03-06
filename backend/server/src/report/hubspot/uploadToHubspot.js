const config = require('../../config');
const api = require('./api');

const pdfFilename = (userFirstName, userLastName) => {
  const firstLetterUpcase = (word) => {
    const firstLetter = word.substring(0, 1);
    const restOfTheWord = word.substring(1);
    return [firstLetter.toUpperCase(), restOfTheWord].join('');
  };
  const firstLetterDowncase = (word) => {
    const firstLetter = word.substring(0, 1);
    const restOfTheWord = word.substring(1);
    return [firstLetter.toLowerCase(), restOfTheWord].join('');
  };
  const toCamelCase = (text) => {
    /*
    Steps:
    - 'hello compass test'
    - ['hello', 'compass', 'test']
    - ['Hello', 'Compass', 'Test']
    - HelloCompassTest
    - helloCompassTest
    */
    return firstLetterDowncase(text.split(' ').map(firstLetterUpcase).join(''));
  };

  const sanitize = (name) => {
    const withoutSpecialChars = name.replace(/[^a-zA-Z ]+/g, '');
    return toCamelCase(withoutSpecialChars);
  };
  const formattedName = () =>
    `${sanitize(userFirstName)}-${sanitize(userLastName)}`;

  return `compassReport_${formattedName()}.pdf`;
};
const REPORT_MIME_TYPE = 'application/pdf';

const uploadReportToHubspot = (pdfBuffer, user) => {
  return api.uploadFile(
    pdfBuffer,
    pdfFilename(user.firstName, user.lastName),
    REPORT_MIME_TYPE,
    config.app.hubspot.reportsFolder
  );
};
const submitHubspotForm = (pdfLink, user, survey) => {
  const scores = [
    {
      name: 'xp_practices_score',
      value: survey.xpPractices.score,
    },
    {
      name: 'team_effectiveness_score',
      value: survey.crossFunctionalTeams.score,
    },
    {
      name: 'organisationalmaturity_score',
      value: survey.organisationalMaturity.score,
    },
    {
      name: 'continuousdelivery_score',
      value: survey.continuousDelivery.score,
    },
    {
      name: 'culture_score',
      value: survey.culture.score,
    },
  ];
  return api.submitForm(pdfLink, user, scores);
};

module.exports = { uploadReportToHubspot, submitHubspotForm };
