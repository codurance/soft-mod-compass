const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'eu-west-1' });
const config = require('../config');
const emailTemplate = config.isESVersion
  ? require('./emailTemplateES')
  : require('./emailTemplateEN');

async function sendPdfLinkEmail(pdfLink, userData) {
  const emailData = {
    Source: 'Codurance-Talk With Us <talkwithus@codurance.com>',
    Destination: {
      ToAddresses: [userData.email],
    },
    ReplyToAddresses: ['talkwithus@codurance.com'],
    Message: {
      Subject: { Data: emailTemplate.subject() },
      Body: {
        Html: { Data: emailTemplate.body(pdfLink, userData, config) },
      },
    },
  };

  return await ses.sendEmail(emailData).promise();
}

module.exports = sendPdfLinkEmail;
