describe('Compass flow', () => {
    it('redirects to HubSpot Successful Submission page when completed', () => {

        cy.visit('https://compass-en.codurance.io')
        assertStartButtonContainsCorrectTextAndClick()
        completeTypeFormSurveryAndSubmit()
        assertRedirectsToHubSpotLPAndContainsCorrectText()
        fillInHubSpotSubmissionForm()
        assertRedirectsToSucessfulSubmissionPageAndContainsCorrectText()

        function assertStartButtonContainsCorrectTextAndClick() {
            const startText = 'Start'
            cy.assertStartButtonContainsCorrectText(startText)
            cy.iframe().contains(startText).click()
        }

        function completeTypeFormSurveryAndSubmit() {
            const waitTime = 1000
            Array.from({length: 20}, (_x, i) => {
                let answer = 'Strongly Agree'
                if(i === 4) answer = 'Hourly'
                cy.waitAndClickAnswer(waitTime, answer)
            })
            cy.waitAndClickAnswer(0, 'Submit')
        }     

        function assertRedirectsToHubSpotLPAndContainsCorrectText() {
            cy.get('h2').should('contain.text', 'Receive your report')
        }

        function fillInHubSpotSubmissionForm() {
            cy.get('[name=firstname]').type('Test')
            cy.get('[name=lastname]').type('Test')
            cy.get('[name=company]').type('Codurance')
            cy.get('[name=email]').type('compass-test@codurance.com')
            cy.contains('Submit').click()
        }

       function assertRedirectsToSucessfulSubmissionPageAndContainsCorrectText() {
        cy.get('h1').should('contain.text', 'Success!')
       }
    })
})