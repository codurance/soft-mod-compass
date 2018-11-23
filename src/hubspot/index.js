const build = require('./build')
const deploy = require('./deploy')
const readFile = require('./readFile')

const startDeployment = async () => {
  const builtLandingPage = build(readFile)
  console.log(process.env.HUBSPOT_AUTH_TOKEN, 'hubspot')
  console.log(process.env, 'env vars')
  const authToken = process.env.HUBSPOT_AUTH_TOKEN
  await deploy(authToken, builtLandingPage, console.log)
}

startDeployment()
