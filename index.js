const app = require('./src/server/app')
const port = 3000

app.listen(port, () => {
  console.log(`ready at http://localhost:${port}`)
})