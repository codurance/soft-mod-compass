const ensureReportWasAttachedToTheContactOnHubspot = require('../support/generalFlow/ensureReportWasAttachedToTheContactOnHubspot');

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
  clickStart();
  completeTypeFormSurveryAndSubmit(
    'Totalmente de acuerdo',
    'Cada hora',
    'Enviar'
  );
  assertRedirectsToHubSpotLPAndContains('Para recibir tu informe');
  fillInHubSpotSubmissionFormAndSubmit();
  assertRedirectsToSucessfulSubmissionPageAndContains('¡Gracias!');
  cy.wait(2 * MINUTES);
  ensureReportWasAttachedToTheContactOnHubspot();
}

function testEnglishCompass() {
  assertStartPageIsInCorrectLanguage(
    'Our software delivery assessment measures the current'
  );
  clickStart();
  completeTypeFormSurveryAndSubmit('Strongly Agree', 'Hourly', 'Submit');
  assertRedirectsToHubSpotLPAndContains('Receive your report');
  fillInHubSpotSubmissionFormAndSubmit();
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

function completeTypeFormSurveryAndSubmit(
  answerText,
  q5AnswerText,
  submitText
) {
  const waitTime = 1000;
  Array.from({ length: 20 }, (_x, i) => {
    let answer = answerText;
    if (i === 4) answer = q5AnswerText;
    cy.waitAndClickAnswer(waitTime, answer);
  });
  cy.waitAndClickAnswer(0, submitText);
}

function assertRedirectsToHubSpotLPAndContains(headerText) {
  cy.get('h2').should('contain.text', headerText);
}

function fillInHubSpotSubmissionFormAndSubmit() {
  cy.get('[name=email]').type('compass-test@codurance.com');
  cy.get('[name=firstname]').type('Compass');
  cy.get('[name=lastname]').type('Test');
  cy.get('[name=company]').type('Codurance');
  cy.get('.hs-button').click();
}

function assertRedirectsToSucessfulSubmissionPageAndContains(successText) {
  cy.get('h1').should('contain.text', successText);
}
