describe('Compass', () => {
  context('flow', () => {
    if (Cypress.env('envToTest') === 'dev:es') {
      // Rename 'dev:es' -> 'playground:es'
      it('(ES) redirects to HubSpot Successful Submission page when completed', () => {
        cy.visit(Cypress.env('devEsUrl'));
        testSpanishCompass;
      });
    }

    if (Cypress.env('envToTest') === 'dev:en') {
      // Rename 'dev:en' -> 'playground:en'
      it('(EN) redirects to HubSpot Successful Submission page when completed', () => {
        cy.visit(Cypress.env('devEnUrl'));
        testEnglishCompass();
      });
    }

    if (!Cypress.env('envToTest') || Cypress.env('envToTest') === 'local') {
      let lang = Cypress.env('lang') ? Cypress.env('lang') : 'en';
      it(`(${lang.toUpperCase()}) redirects to HubSpot Successful Submission page when completed`, () => {
        cy.visit(Cypress.env('localhost'));
        if (lang === 'es') {
          testSpanishCompass();
        } else {
          testEnglishCompass();
        }
      });
    }
  });

  context('When Cookie Message', () => {
    it('is displayed and cookies not created when user has never visited Compass', () => {
      cy.visit(Cypress.env('localhost'));
      clickStart();
      assertCompassCookiesDoNotExist();
      assertCookieMessageIsDisplayed();
    });

    it('should not be visible after user accepts cookie policy', () => {
      cy.visit(Cypress.env('localhost'));
      acceptCookies();
      assertCookieMessageIsNotDisplayed();
    });

    it('should allow cookies after user accepts cookie policy', () => {
      cy.visit(Cypress.env('localhost'));
      acceptCookies();
      assertCompassCookiesExist();
    });

    it('is not visible and cookies are present when user has already accepted cookie in the past', () => {
      cy.setCookie('has-cookie-consent', 'yes');
      cy.visit(Cypress.env('localhost'));
      assertCompassCookiesExist();
      assertCookieMessageIsNotDisplayed();
    });

    // TODO: Fix when streamlining E2E test config
    // it('is displayed in Spanish when a user visits Compass ES', () => {
    //   cy.visit(Cypress.env('localhost'));
    //   let spanishMessage =
    //     'Codurance utiliza cookies para garantizarte la mejor experiencia de navegación en nuestro sitio web.';
    //   assertCorrectCookieMessageIsDisplayed(spanishMessage);
    // });

    it('is displayed in English when a user visits Compass EN', () => {
      cy.visit(Cypress.env('localhost'));
      let englishMessage =
        'Codurance uses cookies to ensure we give you the best experience on our website.';
      assertCorrectCookieMessageIsDisplayed(englishMessage);
    });
  });

  function testSpanishCompass() {
    assertStartPageIsInCorrectLanguage(
      'Nuestra evaluación de entrega de software permite'
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
    cy.get('[name=firstname]').type('Test');
    cy.get('[name=lastname]').type('Test');
    cy.get('[name=company]').type('Codurance');
    cy.get('[name=email]').type('compass-test@codurance.com');
    cy.get('.hs-button').click();
  }

  function assertRedirectsToSucessfulSubmissionPageAndContains(successText) {
    cy.get('h1').should('contain.text', successText);
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
});
