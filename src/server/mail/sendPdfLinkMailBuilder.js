const aws = require('aws-sdk')
const ses = new aws.SES({ region: 'eu-west-1' })

const sendPdfLinkMailBuilder = (getHubspotUserDetails) => {
  async function sendPdfLinkMail (pdfLink, uuid) {
    const userDetails = await getHubspotUserDetails(uuid)
    const email = getUserEmail(userDetails)

    ses.sendEmail(makeEmailData(email, pdfLink), (err, data) => {
      if (err) {
        console.log(err)
      }
    })
  }

  function makeEmailData (email, pdfLink) {
    return {
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
  }

  function getUserEmail (userDetails) {
    return userDetails.values.find(d => d.name === 'email').value
  }

  return sendPdfLinkMail
}

module.exports = sendPdfLinkMailBuilder
