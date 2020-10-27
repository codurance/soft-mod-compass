const comparisonMismatchThreshold = 10;
context('Email Received', () => {
  // it('should return a successful result', () => {
  //   cy.task('queryTestmail')
  //     .then(inbox => {
  //       const data = JSON.parse(inbox)
  //       expect(data.result).to.equal('success')
  //     })
  // })
  //
  // it('should return emails length greater than', () => {
  //   cy.task('queryTestmail').then((mailBox) =>
  //     expect(JSON.parse(mailBox).emails.length).to.be.greaterThan(0)
  //   )
  // })

  it('should return converted pdf as image', () => {
    cy.task('queryTestmail')
      .then((reportLink) => cy.task('convertPDFToPng', reportLink))
      .then((convertedImage) => cy.task('compareImage', convertedImage))
      .then((imageComparisonResult) => {
        console.log(
          'mismatch percentage is ',
          imageComparisonResult.rawMisMatchPercentage
        );
        expect(imageComparisonResult.rawMisMatchPercentage).to.lessThan(
          comparisonMismatchThreshold
        );
      });
  });
});
