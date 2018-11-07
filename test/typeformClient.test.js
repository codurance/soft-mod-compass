const nock = require('nock')
const typeformClient = require('../src/server/typeformClient')

describe('typeformClient', () => {
  it('get survey answers for a particular uuid', (done) => {
    const uuid = '001c1057-7686-49ff-8691-cb7f8de44124'
    const response = {
      answers: [{ choice: { label: 'test' } }]
    }

    nock('https://danparkin.typeform.com', {
      reqheaders: {
        'authorization': 'Bearer A4ertXpQ7ieS26cUM5H1odoeaBR8NTnMSGCkSDKPcsNZ'
      }
    })
      .get(`/forms/Lks1RA/responses?query=${uuid}`)
      .reply(200, {
        items: [response]
      })

    typeformClient.surveyAnswersFor(uuid)
      .then(res => {
        expect(res).toEqual(response)
        done()
      })
      .catch(done)
  })
})
