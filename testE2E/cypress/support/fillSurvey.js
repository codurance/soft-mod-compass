module.exports = () => ({
  fillSurveyWith(answerText, q9AnswerText) {
    const waitTime = 1200;
    Array.from({ length: 20 }, (_x, i) => {
      let answer = answerText;
      if (i === 8) answer = q9AnswerText;
      cy.waitAndClickAnswer(waitTime, answer);
    });
    return this;
  },

  submitToReceiveReportAt(mailAddress) {
    cy.get('[name=email]').type(mailAddress);
    cy.get('[name=firstName]').type('Compass');
    cy.get('[name=lastName]').type('Test');
    cy.get('[name=companyName]').type('Codurance');
    cy.get('[name=jobFunction]').select('Other');
    cy.get('[type=checkbox]').click();
    cy.get('[type=submit]').click();
    return this;
  },
});
