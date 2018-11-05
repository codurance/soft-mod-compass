const url = require('url')

module.exports = (req, res, next) => {
  const submissionGuid = req.query.submissionGuid
  if (submissionGuid !== undefined) {
    res.redirect(url.parse(req.url).pathname)
    return
  }
  next()
}
