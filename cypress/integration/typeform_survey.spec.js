describe('TypeForm Survey', ()=>{
    it('redirects to HubSpot landing page when completed', () => {
        cy.visit('https://compass-en.codurance.io');
        cy.iframe().contains('Start').click();
    })
})