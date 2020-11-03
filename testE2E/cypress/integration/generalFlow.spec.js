const ensureReportWasAttachedToTheContactOnHubspot = require('../support/generalFlow/ensureReportWasAttachedToTheContactOnHubspot');
const Survey = require('../support/fillSurvey');
const SECONDS = 1000;
const MINUTES = 60 * SECONDS;

describe('Compass Flow', () => {
  if (Cypress.env('langToTest') === 'ES') {
    it('(ES) redirects to HubSpot Successful Submission page when completed', () => {
      cy.visit('/');
      testSpanishCompass();
    });
  }

  if (Cypress.env('langToTest') === 'EN') {
    it('(EN) redirects to HubSpot Successful Submission page when completed', () => {
      cy.visit('/');
      testEnglishCompass();
    });
  }
});

function testSpanishCompass() {
  assertStartPageIsInCorrectLanguage(
    'Nuestra herramienta de evaluación de entrega de software permite'
  );
  Survey().fillSurveyWith('Totalmente de acuerdo', 'Cada hora', 'Enviar');
  assertRedirectsToHubSpotLPAndContains('Para recibir tu informe');
  Survey().submitToReceiveReportAt('compass-test@codurance.com');
  assertRedirectsToSucessfulSubmissionPageAndContains('¡Gracias!');
  cy.wait(2 * MINUTES);
  ensureReportWasAttachedToTheContactOnHubspot();
}

function testEnglishCompass() {
  assertStartPageIsInCorrectLanguage(
    'Our software delivery assessment measures the current'
  );
  Survey().fillSurveyWith('Strongly Agree', 'Hourly', 'Submit');
  assertRedirectsToHubSpotLPAndContains('Receive your report');
  Survey().submitToReceiveReportAt('compass-test@codurance.com');
  assertRedirectsToSucessfulSubmissionPageAndContains('Success!');
  cy.wait(2 * MINUTES);
  ensureReportWasAttachedToTheContactOnHubspot();
}

function assertStartPageIsInCorrectLanguage(text) {
  cy.iframe().contains(text);
}

function clickStart() {
  cy.iframe().find('[data-qa=start-button]').click();
}

function assertRedirectsToHubSpotLPAndContains(headerText) {
  cy.get('h2').should('contain.text', headerText);
}

function assertRedirectsToSucessfulSubmissionPageAndContains(successText) {
  cy.get('h1').should('contain.text', successText);
}
