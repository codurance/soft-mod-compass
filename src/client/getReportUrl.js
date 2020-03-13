module.exports = getReportUrl

function getReportUrl (uuid) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    const surveyScoresEndpoint = `/scores/${uuid}`

    request.open('GET', surveyScoresEndpoint)
    request.send()

    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        const response = request.responseText
        console.log(response)
        // TODO retrieve this URL from the server - so it can be easily changed
        const reportLandingPageUrl = `https://info.codurance.com/compass-test-00?uuid=${uuid}&scores=${response.scores}`

        return resolve(reportLandingPageUrl)
      }
    }
  })
}
