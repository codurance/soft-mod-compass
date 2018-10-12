const path = require('path')
const express = require('express')
const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/results', (req, res) => {
  let id = req.query.id
  res.render('results', { data: [40, 10, 50, 30, 70, 40]});
})

module.exports = app
