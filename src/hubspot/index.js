const build = require('./build')
const deploy = require('./deploy')
const readFile = require('./readFile')

const startDeployment = async () => {
  const builtLandingPage = build(readFile)
  await deploy('256e3ebf-f076-4016-a6c9-c787fe81a608', builtLandingPage, console.log)
}

startDeployment()
