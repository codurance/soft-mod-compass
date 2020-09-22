const request = require('request-promise');
let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'mailtrapUser',
    pass: 'mailtrapPass',
  },
});

function sendPdfLinkEmailTest() {
  const emailData = {
    from: 'talkwithus@codurance.com',
    to: 'compass-test@codurance.com',
    subject: 'Test Message 5',
    text: 'Woohoooo this message is sent!',
  };

  console.log('Sending email...');
  return transporter.sendMail(emailData, (err, info) => {
    if (err) console.log(err);
    console.log('Envelope', info.envelope);
    console.log('Message ID', info.messageId);
  });
}

function getMailtrapMessageBody() {
  const options = {
    method: 'GET',
    uri:
      'https://mailtrap.io/api/v1/inboxes/{inbox_id}/messages/{id}?api_token={api_token_here}',
  };
  console.log('Requesting body of message....');
  request(options)
    .then(function (body) {
      const parsedEmailJson = JSON.parse(body);
      console.log(parsedEmailJson);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function debug() {
  const options = {
    method: 'GET',
    uri:
      'https://mailtrap.io/api/v1/inboxes/{inbox_id}/messages/{id}/body.txt?api_token={api_token_here}',
  };
  console.log('Printing body of message....');
  request(options)
    .then(function (body) {
      console.log(body);
    })
    .catch(function (err) {
      console.log(err);
    });
}

sendPdfLinkEmailTest();

debug();
