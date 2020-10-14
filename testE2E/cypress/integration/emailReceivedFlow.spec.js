context('Email Received', () => {
  it('should return a successful result', async () => {
    const inbox = await cy.task('queryTestmail');
    const data = JSON.parse(inbox);
    expect(data.result).to.equal('success');
  });
});
