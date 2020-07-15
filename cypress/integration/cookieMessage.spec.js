describe('Cookie Message', () => {
  it('is displayed and cookies not created when user has never visited Compass', () => {
    cy.visit('/');
    clickStart();
    assertCompassCookiesDoNotExist();
    assertCookieMessageIsDisplayed();
  });

  it('should not be visible after user accepts cookie policy', () => {
    cy.visit('/');
    acceptCookies();
    assertCookieMessageIsNotDisplayed();
  });

  it('should allow cookies after user accepts cookie policy', () => {
    cy.visit('/');
    acceptCookies();
    assertCompassCookiesExist();
  });

  it('is not visible and cookies are present when user has already accepted cookie in the past', () => {
    cy.setCookie('has-cookie-consent', 'yes');
    cy.visit('/');
    assertCompassCookiesExist();
    assertCookieMessageIsNotDisplayed();
  });

  if (Cypress.env('langToTest') === 'EN') {
    it('is displayed in English when a user visits Compass EN', () => {
      cy.visit('/');
      let englishMessage =
        'Codurance uses cookies to ensure we give you the best experience on our website.';
      assertCorrectCookieMessageIsDisplayed(englishMessage);
    });
  }

  if (Cypress.env('langToTest') === 'ES') {
    it('is displayed in Spanish when a user visits Compass ES', () => {
      cy.visit('/');
      let spanishMessage =
        'Codurance utiliza cookies para garantizarte la mejor experiencia de navegación en nuestro sitio web.';
      assertCorrectCookieMessageIsDisplayed(spanishMessage);
    });
  }
});

function clickStart() {
  cy.iframe().find('[data-qa=start-button]').click();
}

function acceptCookies() {
  cy.get('[data-test=cookie-msg-btn]').click();
}

function assertCompassCookiesDoNotExist() {
  cy.getCookie('hubspotutk').should('not.exist');
  cy.getCookie('has-cookie-consent').should('not.exist');
}

function assertCompassCookiesExist() {
  cy.waitUntil(() => cy.getCookie('hubspotutk'));
  cy.getCookie('hubspotutk').should('exist');
  cy.getCookie('has-cookie-consent').should('exist');
}

function assertCookieMessageIsNotDisplayed() {
  cy.get('[data-test=cookie-msg]').should('not.be.visible');
}

function assertCookieMessageIsDisplayed() {
  cy.get('[data-test=cookie-msg]').should('be.visible');
}

function assertCorrectCookieMessageIsDisplayed(text) {
  cy.get('[data-test=cookie-msg-text]').contains(text);
}
