const sendPdfLinkEmail = require('./sendPdfLinkEmail')
const uploadToS3 = require('./uploadToS3')

function uploadPdfToS3AndSendEmail (email, pdf) {
  const s3Promise = uploadToS3(pdf)

  s3Promise
    .then(pdfLink => {
      console.log(`pdf available at ${pdfLink}`)
      sendPdfLinkEmail(email, pdfLink)
    })
    .catch(err => console.log(err))
}

module.exports = uploadPdfToS3AndSendEmail
