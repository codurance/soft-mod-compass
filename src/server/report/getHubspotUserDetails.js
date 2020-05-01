const rp = require('request-promise')
const sleep = require('sleep-promise')
const config = require('../config')

function getHubspotUserDetails (uuid, retries = 3) {
  if (typeof (uuid) !== 'string') console.error('uuid is not a string')

  const options = {
    uri: `https://api.hubapi.com/form-integrations/v1/submissions/forms/${config.hubspot.formId}`,
    qs: {
      hapikey: config.hubspot.authToken
    },
    json: true
  }

  function titleCase (str) {
    const names = str.toLowerCase().split(' ')
    for (let i = 0; i < names.length; i++) {
      names[i] = names[i][0].toUpperCase() + names[i].slice(1)
    }
    return names.join(' ')
  }

  return sleep(2000).then(() => {
    return rp(options).then(response => {
      if (response.results.length > 0) {
        const data = response.results.filter(result => result.values[4].value === uuid)[0]

        data.values = data.values.map(entry => {
          if (entry.name === 'firstname' || entry.name === 'lastname' || entry.name === 'company') {
            entry.value = titleCase(entry.value)
            return entry
          } else {
            return entry
          }
        })

        return data
      } else {
        const retriesLeft = retries - 1
        if (retriesLeft === 0) throw Error(`no data retreived for ${uuid} after three attempts`)
        return sleep(350).then(() => getHubspotUserDetails(uuid, retriesLeft))
      }
    })
      .catch(err => console.error(err))
  })
}

module.exports = getHubspotUserDetails
