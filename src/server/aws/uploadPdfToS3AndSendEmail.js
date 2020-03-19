const sendPdfLinkEmail = require('./sendPdfLinkEmail')
const uploadToS3 = require('./uploadToS3')

function uploadPdfToS3AndSendEmail (viewModel, pdf) {
  const s3Promise = uploadToS3(pdf)

  s3Promise
      .then(data => {
        const pdfLink = data.Location
        console.log(`pdf available at ${pdfLink}`)
        const email = getEmail(viewModel)

        sendPdfLinkEmail(email, pdfLink)
      })
      .catch(err => console.log(err))

  function getEmail (viewModel) {
    return viewModel.userData.values.find(d => d.name === 'email').value
  }
}

module.exports = uploadPdfToS3AndSendEmail
