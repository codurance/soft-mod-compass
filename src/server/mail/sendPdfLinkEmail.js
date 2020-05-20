const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'eu-west-1' });
const config = require('../config')
const emailTemplate = config.isESVersion ? require('./emailTemplateES') : require('./emailTemplateEN')

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
      Subject: { Data: emailTemplate.subject() },
      Body: {
        Html: { Data: emailTemplate.body(pdfLink, userData) },
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
