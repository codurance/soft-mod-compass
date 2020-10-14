context('Email Received', () => {
  it('should return a successful result', async () => {
    const inbox = await cy.task('queryTestmail');
    const data = JSON.parse(inbox);
    expect(data.result).to.equal('success');
  });

  it('should contain report link to download', async () => {});

  it('should return downloaded version of report', function () {});

  it('should return converted pdf as image', function () {});

  it('should compare the image and return percentage difference', function () {});
});
