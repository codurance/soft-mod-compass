const nock = require('nock')
const deploy = require('../../src/hubspot/deploy')

describe('HubSpot deploy', () => {
  const apiKey = 'im-an-api-key'
  const fakeArtifact = '<p>fake artifact</p>'

  const putTemplateChangesWithStatus = (httpStatusCode) => {
    nock('http://api.hubapi.com')
      .put(
        `/content/api/v2/pages/6346726331?hapikey=${apiKey}`,
        JSON.stringify(fakeArtifact))
      .reply(httpStatusCode)
  }

  const postGoLiveRequestWithStatus = (httpStatusCode) => {
    nock('http://api.hubapi.com')
      .post(
        `/content/api/v2/pages/6346726331/publish-action?hapikey=${apiKey}`,
        { action: 'schedule-publish' })
      .reply(httpStatusCode)
  }

  const putTemplateChangesWithSuccessResponse = () => putTemplateChangesWithStatus(200)
  const putTemplateChangesWithErrorResponse = () => putTemplateChangesWithStatus(500)
  const postGoLiveRequestWithSuccessResponse = () => postGoLiveRequestWithStatus(200)
  const postGoLiveRequestWithErrorResponse = () => postGoLiveRequestWithStatus(500)

  it('deploys template changes through to live when both deploy to staging and push live both succeed', async () => {
    putTemplateChangesWithSuccessResponse()
    postGoLiveRequestWithSuccessResponse()

    let loggedMessages = []

    await expect(deploy(apiKey, fakeArtifact, (message) => loggedMessages.push(message)))
      .resolves.toEqual('success')

    expect(loggedMessages).toContain('HubSpot deploy: changes now live')
  })

  it('fails when unable to PUT template changes to staging buffer', async () => {
    putTemplateChangesWithErrorResponse()
    postGoLiveRequestWithErrorResponse()

    let loggedMessages = []

    await expect(deploy(apiKey, fakeArtifact, (message) => loggedMessages.push(message)))
      .rejects.toEqual(Error('failed PUT template changes to staging buffer'))

    expect(loggedMessages).toContain('HubSpot deploy: failed PUT template changes to staging buffer')
  })

  it('fails when unable to POST request to make staging changes go live', async () => {
    putTemplateChangesWithSuccessResponse()
    postGoLiveRequestWithErrorResponse()

    let loggedMessages = []

    await expect(deploy(apiKey, fakeArtifact, (message) => loggedMessages.push(message)))
      .rejects.toEqual(Error('failed POST to put staged changes live'))

    expect(loggedMessages).toContain('HubSpot deploy: failed POST to put staged changes live')
  })
})
