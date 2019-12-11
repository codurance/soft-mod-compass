const rp = require('request-promise')
const sleep = require('sleep-promise')
const config = require('../../src/server/config')

function getHubspotUserDetails (uuid, retries = 3) {
  if (typeof (uuid) !== 'string') console.error('uuid is not a string')

  const options = {
    uri: `https://api.hubapi.com/form-integrations/v1/submissions/forms/${config.hubspot.formId}`,
    qs: {
      hapikey: config.hubspot.authToken
    },
    json: true
  }

  return rp(options).then(response => {
    if (response.results.length > 0) {
      const data = response.results.filter(result => result.values[4].value === uuid)
      return data[0]
    } else {
      const retriesLeft = retries - 1
      if (retriesLeft === 0) throw Error(`no data retreived for ${uuid} after three attempts`)
      return sleep(250).then(() => getHubspotUserDetails(uuid, retriesLeft))
    }
  })
    .catch(err => console.error(err))
}

module.exports = getHubspotUserDetails
