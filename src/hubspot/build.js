const fs = require('fs')
const landingPage = require('./assets/compassLandingPage')

const buildLandingPage = () => {
  const header = fs.readFileSync('./src/hubspot/assets/header.html', 'utf8')
  const body = fs.readFileSync('./src/hubspot/assets/body.html', 'utf8')
  const footer = fs.readFileSync('./src/hubspot/assets/footer.html', 'utf8')

  landingPage.footer_html = footer
  landingPage.head_html = header
  landingPage.widget_containers.module_1395325065960295.widgets[0].body.html = body

  return landingPage
}

module.exports = buildLandingPage
