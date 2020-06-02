describe('Compass flow', () => {

    it('(EN) redirects to HubSpot Successful Submission page when completed', () => {
        cy.visit('https://compass-en.codurance.io')
        assertStartPageIsInCorrectLanguage('Our software delivery assessment measures the current')
        assertStartButtonContainsCorrectTextAndClick('Start')
        completeTypeFormSurveryAndSubmit('Strongly Agree', 'Hourly', 'Submit')
        assertRedirectsToHubSpotLPAndContains('Receive your report')
        fillInHubSpotSubmissionFormAndSubmit()
        assertRedirectsToSucessfulSubmissionPageAndContains('Success!')
    })

    function assertStartPageIsInCorrectLanguage(text) {
        cy.iframe().contains(text)
    }

    function assertStartButtonContainsCorrectTextAndClick(startText) {
        cy.assertStartButtonContainsCorrectText(startText)
        cy.iframe().contains(startText).click()
    }

    function completeTypeFormSurveryAndSubmit(answerText, q5AnswerText, submitText) {
        const waitTime = 1000
        Array.from({length: 20}, (_x, i) => {
            let answer = answerText
            if(i === 4) answer = q5AnswerText
            cy.waitAndClickAnswer(waitTime, answer)
        })
        cy.waitAndClickAnswer(0, submitText)
    }     

    function assertRedirectsToHubSpotLPAndContains(headerText) {
        cy.get('h2').should('contain.text', headerText)
    }

    function fillInHubSpotSubmissionFormAndSubmit() {
        cy.get('[name=firstname]').type('Test')
        cy.get('[name=lastname]').type('Test')
        cy.get('[name=company]').type('Codurance')
        cy.get('[name=email]').type('compass-test@codurance.com')
        cy.get('.hs-button').click()
        cy.wait(6000)
    }

   function assertRedirectsToSucessfulSubmissionPageAndContains(successText) {
        cy.get('h1').should('contain.text', successText)
   }
})