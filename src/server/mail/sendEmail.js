const AWS = require('aws-sdk')
const ses = new AWS.SES({region: 'eu-west-1'})

function sendEmail (email, pdfLink) {
  ses.sendEmail({
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
  })
      .promise()
      .then(_ => console.log(`pdf sent to [${email}]`))
      .catch(err => console.log(`an error occurred while sending pdf to [${email}]\n${err}`))
}

module.exports = sendEmail