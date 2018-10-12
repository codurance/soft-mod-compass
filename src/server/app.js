const express = require('express')
const app = express()

app.use(express.static('dist'))

app.get('/', (req, res) => {
  res
    .status(200)
    .sendFile(__dirname + '/index.html')
})

module.exports = app
