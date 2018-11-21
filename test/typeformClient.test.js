const nock = require('nock')

const config = {
  typeform: {
    url: 'https://typeform-url.com',
    formId: 'formId',
    authToken: 'encoded auth token'
  }
}
const typeformClient = require('../src/server/typeformClient')(config)

describe('typeformClient', () => {
  it('get survey answers for a particular uuid', (done) => {
    const uuid = '001c1057-7686-49ff-8691-cb7f8de44124'

    nock(config.typeform.url, {
      reqheaders: {
        'authorization': `Bearer ${config.typeform.authToken}`
      }
    })
      .get(`/forms/${config.typeform.formId}/responses?query=${uuid}`)
      .reply(200, {
        items: [{
          answers: [
            { choice: { label: 'one' } },
            { choice: { label: 'three' } }
          ]
        }]
      })

    typeformClient.surveyAnswersFor(uuid)
      .then(res => {
        expect(res).toEqual(['one', 'three'])
        done()
      })
      .catch(done)
  })

  it('gets survey schema from typeform', (done) => {
    const questions = [
      { properties: { choices: choicesData() } },
      { properties: { choices: choicesData() } }
    ]

    nock(config.typeform.url)
      .get(`/forms/${config.typeform.formId}`)
      .reply(200, {
        fields: questions
      })

    typeformClient.getQuestionChoices()
      .then(questions => {
        expect(questions).toEqual([
          ['one', 'two', 'three'],
          ['one', 'two', 'three']
        ])
        done()
      })
      .catch(done)
  })
})

function choicesData () {
  return [
    { label: 'one' },
    { label: 'two' },
    { label: 'three' }
  ]
}
