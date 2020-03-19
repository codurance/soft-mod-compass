const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const stream = require('stream')

const uuid = require('uuid')

function uploadToS3 (pdf, bucket) {
  const pdfStreamPipe = new stream.PassThrough()

  const s3Parameters = {
    Bucket: bucket,
    Key: `compass-report-${uuid.v4()}.pdf`,
    Body: pdfStreamPipe,
    ACL: 'public-read'
  }

  pdf.stream.pipe(pdfStreamPipe)

  return s3.upload(s3Parameters).promise()
    .then(data => data.Location)
}

module.exports = uploadToS3
