const path = require('path')
const rp = require('request-promise');
const express = require('express')
const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/results', (req, res) => {
  const id = req.query.id

  const options = {
    uri: `https://api.typeform.com/forms/Lks1RA/responses`,
    qs: {
        query: id
    },
    headers: {
        'Authorization': 'Bearer A4ertXpQ7ieS26cUM5H1odoeaBR8NTnMSGCkSDKPcsNZ'
    },
    json: true
  };

  rp(options)
    .then(function (response) {
      const answers = response.items[0].answers
      console.log(answers);
    })
    .catch(function (err) {
      console.log('oh snap!')
    });

  res.render('results', { data: [40, 10, 50, 30, 70, 40]});
})

module.exports = app
