const build = require('./build')
const deploy = require('./deploy')
const readFile = require('./readFile')

const startDeployment = async () => {
  const builtLandingPage = build(readFile)
  console.log(process.env.HUBSPOT_AUTH_TOKEN, 'hubspot')
  console.log(process.env, 'env vars')
  await deploy('256e3ebf-f076-4016-a6c9-c787fe81a608', builtLandingPage, console.log)
}

startDeployment()
