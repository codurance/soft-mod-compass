const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const stream = require('stream')
const sendEmail = require('../mail/sendEmail')

function uploadPdfToS3AndSendEmail (viewModel, out) {
  var pass = new stream.PassThrough()

  // Setting up S3 upload parameters
  const params = {
    Bucket: 'compass-pdf',
    Key: 'test.pdf', // File name you want to save as in S3
    Body: pass,
    ACL: 'public-read'
  }

  // Uploading files to the bucket
  s3.upload(params).promise()
      .then((data) => {
        const email = viewModel.userData.values.find(d => d.name === 'email').value
        const pdfLink = data.Location

        console.log(`pdf available at ${pdfLink}`)
        sendEmail(email, pdfLink)
      })
      .catch(err => console.log(err))

  out.stream.pipe(pass)
}

module.exports = uploadPdfToS3AndSendEmail
