const nock = require('nock')
const getReportUrl = require('../../src/client/getReportUrl')

describe('getReportUrl', () => {
  it('gets the scores for the user and generates the hubspot url', (done) => {
    const uuid = 'test-uuid'
    const scores = 'base64 encoded string'

    nock('http://localhost')
      .get(`/scores/${uuid}`)
      .reply(200, scores)

    getReportUrl(uuid)
      .then((url) => {
        expect(url).toEqual(`https://info.codurance.com/compass-test-0?uuid=${uuid}&scores=${scores}`)
        done()
      })
      .catch(done)
  })
})
