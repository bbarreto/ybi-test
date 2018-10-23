const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'frontend/build')))
  .use('/api/countries', require('./apiCountries'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
