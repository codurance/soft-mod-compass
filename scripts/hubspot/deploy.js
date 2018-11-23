const rp = require('request-promise')

module.exports = (apiKey, buildArtifact, logger) => {
  return new Promise((resolve, reject) => {
    const log = (message) => {
      logger(`HubSpot deploy: ${message}`)
    }

    const deployChangesToHubSpotStagingBuffer = (pushToLive) => {
      const templateUpdateOptions = {
        method: 'PUT',
        uri: `http://api.hubapi.com/content/api/v2/pages/6346726331?hapikey=${apiKey}`,
        body: buildArtifact,
        json: true
      }

      rp(templateUpdateOptions)
        .then(() => {
          log('changes deployed to staging buffer')
          pushToLive()
        })
        .catch((error) => {
          log(error)

          const errorMessage = 'failed PUT template changes to staging buffer'
          log(errorMessage)
          reject(new Error(errorMessage))
        })
    }

    const publishChangesToLive = () => {
      const publishOptions = {
        method: 'POST',
        uri: `http://api.hubapi.com/content/api/v2/pages/6346726331/publish-action?hapikey=${apiKey}`,
        body: { action: 'schedule-publish' },
        json: true
      }

      rp(publishOptions)
        .then(() => {
          log('changes now live')
          resolve('success')
        })
        .catch((error) => {
          log(error)

          const errorMessage = 'failed POST to put staged changes live'
          log(errorMessage)
          reject(new Error(errorMessage))
        })
    }

    deployChangesToHubSpotStagingBuffer(publishChangesToLive)
  })
}
