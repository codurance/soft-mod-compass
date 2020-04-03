const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'eu-west-1' });
const pdfLinkEmail = require('./PdfLinkEmail');

function sendPdfLinkEmail(pdfLink, userData) {
  const emailData = {
    Source: 'Codurance-Talk With Us <talkwithus@codurance.com>',
    Destination: {
      ToAddresses: [userData.email],
    },
    ReplyToAddresses: [
      'talkwithus@codurance.com'
    ],
    Message: {
      Subject: { Data: 'Here is your Codurance Compass report' },
      Body: {
        Html: { Data: pdfLinkEmail(pdfLink, userData) },
      },
    },
  };

  ses
    .sendEmail(emailData)
    .promise()
    .then(_ => console.log(`pdf sent to [${userData.email}]`))
    .catch(err =>
      console.log(
        `an error occurred while sending pdf to [${userData.email}]\n${err}`
      )
    );
}

module.exports = sendPdfLinkEmail;
