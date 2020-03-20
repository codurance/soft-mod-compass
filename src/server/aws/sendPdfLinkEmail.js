const AWS = require('aws-sdk')
const ses = new AWS.SES({ region: 'eu-west-1' })

function sendPdfLinkEmail (pdfLink, userData) {
  const emailData = {
    Source: 'compass@codurance.com',
    Destination: {
      ToAddresses: [userData.email]
    },
    Message: {
      Subject: { Data: 'Your compass report' },
      Body: {
        Text: { Data: `Hi ${userData.firstname},\nYou can download your pdf here: ${pdfLink}` }
      }
    }
  }

  ses.sendEmail(emailData).promise()
    .then(_ => console.log(`pdf sent to [${userData.email}]`))
    .catch(err => console.log(`an error occurred while sending pdf to [${userData.email}]\n${err}`))
}

module.exports = sendPdfLinkEmail
