describe('Compass on Hubspot', function () {
  it('should visit first page of Compass and click start button', function () {
    cy.visit('https://info.codurance.com/dev-compass-en-survey-landing-page');
    cy.iframe().find('[data-qa=start-button]').click();
  });
});
