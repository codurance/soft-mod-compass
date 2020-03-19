const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const stream = require('stream')
const sendPdfLinkEmail = require('./sendPdfLinkEmail')

function uploadPdfToS3AndSendEmail (viewModel, pdf) {
  const pdfStreamPipe = new stream.PassThrough()

  const s3Parameters = {
    // TODO extract bucket name as env variable
    Bucket: 'compass-pdf',
    // TODO generate a proper name
    Key: 'test.pdf',
    Body: pdfStreamPipe,
    ACL: 'public-read'
  }

  s3.upload(s3Parameters).promise()
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

  pdf.stream.pipe(pdfStreamPipe)
}

module.exports = uploadPdfToS3AndSendEmail
