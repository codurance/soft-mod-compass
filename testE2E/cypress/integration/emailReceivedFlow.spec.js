context('Email Received', () => {
  it('should return a successful result', async () => {
    const inbox = await cy.task('queryTestmail');
    const data = JSON.parse(inbox);
    expect(data.result).to.equal('success');
  });

  // Writing this test for now to ensure testmail has
  // at least one email in the inbox
  // Probably won't need this when incorporated in the
  // generalFlow spec
  it('should return emails length greater than', async () => {
    const inbox = await cy.task('queryTestmail');
    const data = JSON.parse(inbox);
    expect(data.emails.length).to.be.greaterThan(0);
  });

  it('should return converted pdf as image', async () => {
    await cy.task('convertPDFToPng');
    await cy.task('compareImage');

    expect(2).to.equal(0);
  });
});
