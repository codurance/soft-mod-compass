module.exports = () => ({
  fillSurveyWith(answerText, q5AnswerText, submitText) {
    cy.iframe().find('[data-qa=start-button]').click();
    const waitTime = 1000;
    Array.from({ length: 20 }, (_x, i) => {
      let answer = answerText;
      if (i === 4) answer = q5AnswerText;
      cy.waitAndClickAnswer(waitTime, answer);
    });
    cy.waitAndClickAnswer(0, submitText);
    return this;
  },

  submitToReceiveReportAt(mailAddress) {
    cy.get('[name=email]').type(mailAddress);
    cy.get('[name=firstname]').type('Compass');
    cy.get('[name=lastname]').type('Test');
    cy.get('[name=company]').type('Codurance');
    cy.get('.hs-button').click();
    return this;
  },
});
