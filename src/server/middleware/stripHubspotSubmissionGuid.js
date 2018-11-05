const url = require('url')

module.exports = (req, res, next) => {
  const { submissionGuid } = req.query
  const requestHasSubmissionGuidQueryParam = submissionGuid !== undefined
  const pathWithoutQueryString = url.parse(req.url).pathname

  if (requestHasSubmissionGuidQueryParam) {
    res.redirect(pathWithoutQueryString)
    return
  }
  next()
}
