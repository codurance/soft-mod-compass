context('Email Received', () => {
  xit('should return a successful result', async () => {
    const inbox = await cy.task('queryTestmail');
    const data = JSON.parse(inbox);
    expect(data.result).to.equal('success');
  });

  xit('should contain report link to download', async () => {});

  xit('should return downloaded version of report', function () {});

  it('should return converted pdf as image', async () => {
    await cy.task('convertToPng');
    const result = await cy.task('compareImage');
    console.log(result);
    expect(result).to.equal(0);
  });

  xit('should compare the image and return percentage difference', function () {});
});
