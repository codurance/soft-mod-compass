const rp = require('request-promise')
const buildArtifact = require('./build')

const log = (message) => {
  console.log(`HubSpot deploy: ${message}`)
}

const deployChangesToHubSpotStagingBuffer = (pushToLive) => {
  const templateUpdateOptions = {
    method: 'PUT',
    uri: 'http://api.hubapi.com/content/api/v2/pages/6346726331?hapikey=256e3ebf-f076-4016-a6c9-c787fe81a608',
    body: buildArtifact(),
    json: true
  }

  rp(templateUpdateOptions)
    .then(() => {
      log('changes deployed to staging buffer')
      pushToLive()
    })
    .catch((error) => {
      log('failed PUT template changes to staging buffer')
      log(error)
    })
}

const publishChangesToLive = () => {
  const publishOptions = {
    method: 'POST',
    uri: 'http://api.hubapi.com/content/api/v2/pages/6346726331/publish-action?hapikey=256e3ebf-f076-4016-a6c9-c787fe81a608',
    body: { action: 'schedule-publish' },
    json: true
  }

  rp(publishOptions)
    .then(() => {
      log('changes now live')
    })
    .catch((error) => {
      log('failed POST to put staged changes live')
      log(error)
    })
}

deployChangesToHubSpotStagingBuffer(publishChangesToLive)
