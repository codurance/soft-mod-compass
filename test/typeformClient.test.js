const nock = require('nock')
const typeformClient = require('../src/server/typeformClient')

describe('typeformClient', () => {
  it('get survey answers for a particular uuid', (done) => {
    const uuid = '001c1057-7686-49ff-8691-cb7f8de44124'

    nock('https://mashooqbadar.typeform.com', {
      reqheaders: {
        'authorization': 'Bearer 3U8FHS7YZV4GCpbwyxNUybKaAQAQZAzFyXoqCFeGqYRk'
      }
    })
      .get(`/forms/yiRLeY/responses?query=${uuid}`)
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

    nock('https://mashooqbadar.typeform.com')
      .get(`/forms/yiRLeY`)
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
