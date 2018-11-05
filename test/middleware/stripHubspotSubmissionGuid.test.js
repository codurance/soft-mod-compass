const stripHubspotSubmissionGuid = require('../../src/server/middleware/stripHubspotSubmissionGuid')

describe('stripHubspotSubmissionGuid middleware', () => {
  it('redirects to correct path with submissionGuid param removed when submissionGuid is in query string', () => {
    const submissionGuid = 'cc586c95-1e4b-46fe-a3b0-6c6c855a123f'
    const request = {
      query: {
        submissionGuid
      },
      url: `/report/unique-report-id?submissionGuid=${submissionGuid}`
    }
    const response = {
      redirect: jest.fn(redirectUrl => {})
    }
    const nextMiddleware = jest.fn()

    stripHubspotSubmissionGuid(request, response, nextMiddleware)

    expect(redirectFrom(response)).toBe('/report/unique-report-id')
    expect(nextMiddleware.mock.calls.length).toBe(0)
  })

  it('passes through to next middleware when submissionGuid is not in query string', () => {
    const request = {
      query: {
        submissionGuid: undefined
      },
      url: '/report/unique-report-id'
    }
    const response = {
      redirect: jest.fn()
    }
    const nextMiddleware = jest.fn()

    stripHubspotSubmissionGuid(request, response, nextMiddleware)

    expect(response.redirect.mock.calls.length).toBe(0)
    expect(nextMiddleware.mock.calls.length).toBe(1)
  })

  it('passes through to next middleware when has query string parameters that do not include submissionGuid', () => {
    const request = {
      query: {
        submissionGuid: undefined,
        fooParam: 'foo'
      },
      url: '/report/unique-report-id?fooParam=foo'
    }
    const response = {
      redirect: jest.fn()
    }
    const nextMiddleware = jest.fn((req, res) => {})

    stripHubspotSubmissionGuid(request, response, nextMiddleware)

    expect(response.redirect.mock.calls.length).toBe(0)
    expect(nextMiddleware.mock.calls.length).toBe(1)
  })
})

const redirectFrom = (response) => {
  return response.redirect.mock.calls[0][0]
}
