const AWS = require('aws-sdk')
const ses = new AWS.SES({ region: 'eu-west-1' })

function sendPdfLinkEmail (email, pdfLink) {
  const emailData = {
    Source: 'compass@codurance.com',
    Destination: {
      ToAddresses: [email]
    },
    Message: {
      Subject: { Data: 'Your compass report' },
      Body: {
        Text: { Data: `You can download your pdf here: ${pdfLink}` }
      }
    }
  }

  ses.sendEmail(emailData).promise()
    .then(_ => console.log(`pdf sent to [${email}]`))
    .catch(err => console.log(`an error occurred while sending pdf to [${email}]\n${err}`))
}

module.exports = sendPdfLinkEmail
