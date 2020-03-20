const sendPdfLinkEmail = require('./sendPdfLinkEmail')
const uploadToS3 = require('./uploadToS3')

function uploadPdfToS3AndSendEmail (pdf, bucket, userData) {
  const pdfLinkPromise = uploadToS3(pdf, bucket)

  pdfLinkPromise
    .then(pdfLink => {
      console.log(`pdf available at ${pdfLink}`)
      sendPdfLinkEmail(pdfLink, userData)
    })
    .catch(err => console.log(`an error occurred while uploading the pdf\n${err}`))
}

module.exports = uploadPdfToS3AndSendEmail
