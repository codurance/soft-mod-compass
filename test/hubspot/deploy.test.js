const nock = require('nock')
const deploy = require('../../src/hubspot/deploy')

describe('HubSpot deploy', () => {
  it('deploys template changes through to live when both deploy to staging and push live both succeed', async () => {
    const apiKey = 'im-an-api-key'

    nock('http://api.hubapi.com')
      .put(`/content/api/v2/pages/6346726331?hapikey=${apiKey}`)
      .reply(200)

    nock('http://api.hubapi.com')
      .post(`/content/api/v2/pages/6346726331/publish-action?hapikey=${apiKey}`, { action: 'schedule-publish' })
      .reply(200)

    let loggedMessages = []

    await expect(deploy(apiKey, '<p>fake artifact</p>', (message) => loggedMessages.push(message)))
      .resolves.toEqual('success')

    expect(loggedMessages).toContain('HubSpot deploy: changes now live')
  })

  it('fails when unable to PUT template changes to staging buffer', async () => {
    const apiKey = 'im-an-api-key'

    nock('http://api.hubapi.com')
      .put(`/content/api/v2/pages/6346726331?hapikey=${apiKey}`)
      .reply(500)

    nock('http://api.hubapi.com')
      .post(`/content/api/v2/pages/6346726331/publish-action?hapikey=${apiKey}`, { action: 'schedule-publish' })
      .reply(500)

    let loggedMessages = []

    await expect(deploy(apiKey, '<p>fake artifact</p>', (message) => loggedMessages.push(message)))
      .rejects.toEqual(Error('failed PUT template changes to staging buffer'))

    expect(loggedMessages).toContain('HubSpot deploy: failed PUT template changes to staging buffer')
  })

  it('fails when unable to POST request to make staging changes go live', async () => {
    const apiKey = 'im-an-api-key'

    nock('http://api.hubapi.com')
      .put(`/content/api/v2/pages/6346726331?hapikey=${apiKey}`)
      .reply(200)

    nock('http://api.hubapi.com')
      .post(`/content/api/v2/pages/6346726331/publish-action?hapikey=${apiKey}`, { action: 'schedule-publish' })
      .reply(500)

    let loggedMessages = []

    await expect(deploy(apiKey, '<p>fake artifact</p>', (message) => loggedMessages.push(message)))
      .rejects.toEqual(Error('failed POST to put staged changes live'))

    expect(loggedMessages).toContain('HubSpot deploy: failed POST to put staged changes live')
  })
})
