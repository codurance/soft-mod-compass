const AWS = require('aws-sdk')
const s3 = new AWS.S3({ signatureVersion: 'v4' })
const stream = require('stream')

const uuid = require('uuid')

function uploadToS3 (pdf, bucket) {
  const pdfStreamPipe = new stream.PassThrough()

  const s3Parameters = {
    Bucket: bucket,
    Key: `compass-report-${uuid.v4()}.pdf`,
    Body: pdfStreamPipe
  }

  pdf.stream.pipe(pdfStreamPipe)

  return s3.upload(s3Parameters).promise()
    .then(data => {
      const p = {
        Bucket: bucket,
        Key: data.Key
      }
      return s3.getSignedUrlPromise('getObject', p)
    })
}

module.exports = uploadToS3
