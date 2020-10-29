const Survey = require('../support/fillSurvey');
const comparisonMismatchThreshold = 10;

context('Email Received', () => {
  before('given a survey filled in english', () => {
    cy.visit('/');
    Survey()
      .fillSurveyWith('Strongly Agree', 'Hourly', 'Submit')
      .submitToReceiveReportAt('9cmtz.test@inbox.testmail.app');
    cy.wait(10000);
  });

  it('should send email with pdf report in english', () => {
    cy.task('queryTestmail').then((email) => {
      assertLanguage(email);
      comparePdfReport(email).then(assertComparisonIsSuccessful());
    });
  });

  function assertLanguage(email) {
    expect(email.subject).to.eq('Here is your Codurance Compass report');
    expect(email.textFirstLine).to.eq('Your report expires in 30 days.\n');
  }

  function comparePdfReport(email) {
    return cy
      .task('convertPDFToPng', email.reportLink)
      .then((convertedImage) => cy.task('compareImage', convertedImage));
  }

  function assertComparisonIsSuccessful() {
    return (imageComparisonResult) => {
      console.log(
        'mismatch percentage is ',
        imageComparisonResult.rawMisMatchPercentage
      );
      expect(imageComparisonResult.rawMisMatchPercentage).to.lessThan(
        comparisonMismatchThreshold
      );
    };
  }
});
