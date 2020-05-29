describe('TypeForm Survey', () => {
    it('redirects to HubSpot landing page when completed', () => {
        cy.visit('https://compass-en.codurance.io');
        cy.iframe().contains('Start').click();

        const waitTime = 1000

        Array.from({length: 20}, (x, i) => {
            let answer = 'Strongly Agree'
            if(i === 4) answer = 'Hourly'
            cy.waitAndClickAnswer(waitTime, answer)
        });

        cy.iframe().contains('Submit').click({force: true})

    })
})