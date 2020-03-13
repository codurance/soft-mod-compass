module.exports = getReportUrl

function getReportUrl (uuid) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    const surveyScoresEndpoint = `/scores/${uuid}`

    request.open('GET', surveyScoresEndpoint)
    request.send()

    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        const scores = request.responseText
        // TODO extract landing page url to config
        const reportLandingPageUrl = `https://info.codurance.com/compass-test?uuid=${uuid}&scores=${scores}`

        return resolve(reportLandingPageUrl)
      }
    }
  })
}
