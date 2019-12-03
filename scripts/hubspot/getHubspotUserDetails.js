const rp = require('request-promise')
const config = require('../../src/server/config')

function getHubspotUserDetails (uuid) {
  const authorisation = config.hubspot.authToken
  const formId = config.hubspot.formId
  const endpoint = `https://api.hubapi.com/form-integrations/v1/submissions/forms/${formId}?hapikey=${authorisation}`

  if (typeof (uuid) !== 'string') console.error('uuid is not a string')

  const options = {
    uri: endpoint,
    json: true
  }

  return rp(options).then(response => {
    return response.results[0]
  })
    .catch(err => console.error(err))
}

module.exports = getHubspotUserDetails
