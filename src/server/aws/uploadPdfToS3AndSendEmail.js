const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const stream = require('stream')
const sendEmail = require('./sendEmail')

function uploadPdfToS3AndSendEmail (viewModel, pdf) {
  const pdfStreamPipe = new stream.PassThrough()

  const params = {
    // TODO extract bucket name as env variable
    Bucket: 'compass-pdf',
    // TODO generate a proper name
    Key: 'test.pdf',
    Body: pdfStreamPipe,
    ACL: 'public-read'
  }

  s3.upload(params).promise()
      .then(sendPdfLinkEmail)
      .catch(err => console.log(err))

  function sendPdfLinkEmail (data) {
    const email = getEmail(viewModel)
    const pdfLink = data.Location

    console.log(`pdf available at ${pdfLink}`)
    sendEmail(email, pdfLink)
  }

  function getEmail (viewModel) {
    return viewModel.userData.values.find(d => d.name === 'email').value
  }

  pdf.stream.pipe(pdfStreamPipe)
}

module.exports = uploadPdfToS3AndSendEmail
