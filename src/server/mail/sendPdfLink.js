const aws = require('aws-sdk')
const ses = new aws.SES({region: 'eu-west-1'})

const sendPdfLinkMailBuilder = (getHubspotUserDetails) => {
    async function sendPdfLinkMail(pdfLink, uuid) {
        const userDetails = await getHubspotUserDetails(uuid);
        const email = userDetails.values.find(d => d.name === "email").value
        ses.sendEmail({
            Source: "compass@codurance.com",
            Destination: {
                ToAddresses: [email]
            },
            Message: {
                Subject: {Data: 'Your compass report'},
                Body: {
                    Text: {Data: `You can download your pdf here: ${pdfLink}`}
                },
            }
        }, (err, data) => {
            if (err) {
                console.log(err);
            }
            console.log(data);
        });
    }

    return sendPdfLinkMail
}

module.exports = sendPdfLinkMailBuilder
