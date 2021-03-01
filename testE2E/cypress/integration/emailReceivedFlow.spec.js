const Survey = require('../support/fillSurvey');
const generateUuid = require('uuid/v4');
const comparisonMismatchThreshold = 10;

context('Email Received', { taskTimeout: 90000 }, () => {
  const randomTag = generateUuid();
  before('given a survey filled in english', () => {
    cy.visit('/');
    cy.get('#hs-eu-confirmation-button').click();
    cy.get('[type=button]').click();
    Survey()
      .fillSurveyWith('Strongly Agree', 'Hourly')
      .submitToReceiveReportAt(`9cmtz.${randomTag}@inbox.testmail.app`);
  });

  it('should send email with pdf report in english', () => {
    cy.task('queryTestmail', randomTag).then((email) => {
      assertLanguage(email);
      cy.task('assertOnPdfLink', email.reportLink).then((pdf) => {
        console.log('pdf content', pdf);
        expect(pdf).not.to.be.undefined;
      });
    });
  });

  function assertLanguage(email) {
    expect(email.subject).to.eq('Here is your Codurance Compass report');
  }
});
