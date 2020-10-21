const comparisonMismatchThreshold = 10
context('Email Received', () => {
  it('should return a successful result', async () => {
    const inbox = await cy.task('queryTestmail')
    const data = JSON.parse(inbox)
    expect(data.result).to.equal('success')
  })

  // Writing this test for now to ensure testmail has
  // at least one email in the inbox
  // Probably won't need this when incorporated in the
  // generalFlow spec
  it('should return emails length greater than', () => {
    cy.task('queryTestmail')
      .then(mailBox =>
        expect(
          JSON.parse(mailBox)
            .emails.length
        ).to.be.greaterThan(0)
      )
  })

  it('should return converted pdf as image', () => {
    cy.task('convertPDFToPng')
      .then(convertedImage => cy.task('compareImage', convertedImage))
      .then(
        imageComparisonResult => {
          console.log('mismatch percentage is ', imageComparisonResult.rawMisMatchPercentage)
          expect(imageComparisonResult.rawMisMatchPercentage).to.lessThan(comparisonMismatchThreshold)
        }
      )
  })
})
