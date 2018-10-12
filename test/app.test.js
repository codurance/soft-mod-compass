const request = require('supertest')

const app = require('../src/server/app')

describe('app', () => {
  it('responds with html on homepage', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done)
  })
})
