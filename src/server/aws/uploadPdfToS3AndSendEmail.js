const sendPdfLinkEmail = require('./sendPdfLinkEmail')
const uploadToS3 = require('./uploadToS3')

function uploadPdfToS3AndSendEmail (email, pdf) {
  const pdfLinkPromise = uploadToS3(pdf)

  pdfLinkPromise
    .then(pdfLink => {
      console.log(`pdf available at ${pdfLink}`)
      sendPdfLinkEmail(email, pdfLink)
    })
    .catch(err => console.log(`an error occurred while uploading the pdf\n${err}`))
}

module.exports = uploadPdfToS3AndSendEmail
