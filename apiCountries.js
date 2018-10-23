const express = require('express')
const router = express.Router()
const axios = require('axios')
const RESTCOUNTRIES_ENDPOINT = process.env.RESTCOUNTRIES_ENDPOINT

// Question 1
router.get('/getByName', (req, res) => {
  // Validate if there is a country name on querystring (bad request)
  if (!req.query.name) {
    return res.status(400).send({
      code: 400,
      error: 'Parameter "name" is mandatory'
    })
  }

  let name = req.query.name

  axios.get(`${RESTCOUNTRIES_ENDPOINT}/name/${name}?fullText=true`)
    .then(response => {
      return res.send(response.data[0])
    })
    .catch(err => {
      // If we can't find the country, we inform the user
      if (err.response && err.response.status === 404) {
        return res.status(404).send({
          code: 404,
          error: 'Country not found.'
        })
      }

      // Log this type of error for later analysis
      console.error('Error calling RestCountries API', err)

      // Return a message
      return res.status(500).send({
        code: 500,
        error: 'Error while performing search. Please, try again later.'
      })
    })
})

// Question 2
router.get('/search', (req, res) => {
  // Validate if name is an object
  if (!req.query.name || typeof req.query.name !== 'object') {
    return res.status(400).send({
      code: 400,
      error: 'Parameter "name" must be an array'
    })
  }

  let names = req.query.name
  let searches = []

  names.forEach(name => {
    searches.push(axios.get(`${RESTCOUNTRIES_ENDPOINT}/name/${name}`, {
      // Ignore some status to not throw error if some country is not found
      validateStatus: function (status) {
        return status >= 200 && status < 499
      }
    }))
  })

  // When all the searches are done
  Promise.all(searches)
    .then(results => {
      let countries = {}

      // Append all results to same array
      results.forEach(result => {
        if (result.status !== 200) return null
        result.data.forEach(country => {
          countries[country.name] = country
        })
      })

      // Return an object with all countries found
      return res.send(countries)
    })
    .catch(err => {
      console.error('Error calling RestCountries API', err)
      return res.send({
        code: 500,
        error: 'Error while searching contries. Please, try again later.'
      })
    })
})

// Question 3
router.get('/getAll', (req, res) => {
  axios.get(`${RESTCOUNTRIES_ENDPOINT}/all`)
    .then(response => {
      return res.send(response.data)
    })
    .catch(err => {
      // Log this error for later analysis
      console.error('Error calling RestCountries API', err)

      // Return a message
      return res.status(500).send({
        code: 500,
        error: 'Error while fetching countries. Please, try again later.'
      })
    })
})

module.exports = router
