const build = require('../../src/hubspot/build')
const fs = require('fs')

describe('HubSpot build', () => {
  it('substitues header, footer and body html correctly', () => {
    jest.mock('fs')

    fs.readFileSync = jest
      .fn()
      .mockImplementationOnce(() => 'header html')
      .mockImplementationOnce(() => 'body html')
      .mockImplementationOnce(() => 'footer html')

    const landingPage = build()

    expect(landingPage.head_html).toBe('header html')
    expect(landingPage.footer_html).toBe('footer html')
    expect(landingPage.widget_containers.module_1395325065960295.widgets[0].body.html).toBe('body html')
  })
})
