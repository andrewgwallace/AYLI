const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3004
const listener = () => console.log(`Server is running on port ${port}`)
const knex = require('../db/knex')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const twitter = require('./twitter');


app.disable('x-powered-by')
app.use(express.static(path.join(__dirname, '../client/build')))
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  const index = path.join(__dirname, '../client/build/index.html')
  res.sendFile(index)
})

// Handles getting all show data that is used by Google Maps API on the frontend.
app.get('/api/shows', (req, res, next) => {
  knex('shows')
  .then(shows => res.json({shows: shows}))
  .catch(error => { console.error(error);})
})

// TWITTER ACCESS TOKEN
app.get('/access-token', (req, res, next) => {
  let token = req.query.oauth_token
  let verifier = req.query.oauth_verifier;

  twitter.accessToken(token, verifier)
  .then( accessToken => {
    return twitter.verifyCredentials(accessToken);
  })
  .then(user => {
    res.send(user);
  })
  .catch( error => {
    console.error(error);
  })
})

// TWITTER REQUEST TOKEN 
app.get('/request-token', (req, res, next) => {
  twitter.requestToken()
  .then(requestToken => {
    res.send(requestToken);
  })
  .catch(error => {
    console.error(error);
  })
})

// handle error
app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ error: err })
})
// not found
app.use((req, res, next) => {
  res.status(404).json( {error: { message: "Not found."}})
})

app.listen(port, listener)
