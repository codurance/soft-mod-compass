const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const stream = require('stream')

function uploadToS3 (pdf, bucket) {
  const pdfStreamPipe = new stream.PassThrough()

  const s3Parameters = {
    Bucket: bucket,
    // TODO generate a proper name
    Key: 'test.pdf',
    Body: pdfStreamPipe,
    ACL: 'public-read'
  }

  pdf.stream.pipe(pdfStreamPipe)

  return s3.upload(s3Parameters).promise()
    .then(data => data.Location)
}

module.exports = uploadToS3
