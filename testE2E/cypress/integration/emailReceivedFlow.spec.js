context('Email Received', () => {
  it('should return a successful result', async () => {
    const inbox = await cy.task('queryTestmail');
    const data = JSON.parse(inbox);
    expect(data.result).to.equal('success');
  });

  it('should contain english text', async () => {
    const inbox = await cy.task('queryTestmail');
    const data = JSON.parse(inbox);
    expect(data.emails.length).to.equal(2);
  });
});
