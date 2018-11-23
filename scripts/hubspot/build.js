const landingPage = require('./assets/compassLandingPage')

const buildLandingPage = (readFile) => {
  const header = readFile('./scripts/hubspot/assets/header.html')
  const body = readFile('./scripts/hubspot/assets/body.html')
  const footer = readFile('./scripts/hubspot/assets/footer.html')

  landingPage.footer_html = footer
  landingPage.head_html = header
  landingPage.widget_containers.module_1395325065960295.widgets[0].body.html = body

  return landingPage
}

module.exports = buildLandingPage
