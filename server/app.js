const express = require('express')
const session = require('express-session')
const app = express()
const path = require('path')
const port = process.env.PORT || 3004
const listener = () => console.log(`Server is running on port ${port}`)
const knex = require('../db/knex')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const passport = require('passport');

require("dotenv").config( {path: __dirname + '/.env'});

const showRoutes = require('./routes/shows')


app.disable('x-powered-by')
app.use(express.static(path.join(__dirname, '../client/build')))
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.TWITTER_TOKEN_SECRET
}))
app.use(passport.initialize())
app.use(passport.session());
const twitter = require("./auth/twitter");
app.use('/auth', twitter);
app.use('/api/shows', showRoutes);


app.get('/', (req, res, next) => {
  const index = path.join(__dirname, '../client/build/index.html')
  res.sendFile(index)
})

// not found
app.use((req, res, next) => {
  res.status(404).json({ error: { message: "Not found." } })
})

// handle error
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500
  res.status(status).json({
    message: err.message,
    stack: err.stack
  })
})


app.listen(port, listener)
