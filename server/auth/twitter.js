const express = require('express');
var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy
  // , OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: "/auth/twitter/callback"
},
  function (token, tokenSecret, profile, done) {
    console.log(profile);
    // Check database to see if user exists with twitter_id

    // If they do exist, update tauth_token to be token.

    // Else, insert them into the database with given twitter_id and token

    // When done, call done with user from database (as below)
    // done(null, user)
    done(null, {token, tokenSecret});

  }
));

const router = express.Router();

router.get("/twitter", passport.authenticate("twitter"));

router.get('/twitter/callback', (req, res, next) => {
  // Lookup custom callback in passport docs
  passport.authenticate("twitter", (err, user) => {
    if (err) {
      next(err);
    } else {
      // intead of responding with user, respond with jwt with user encoded as payload.
      res.json(user);
    }
  })(req, res, next);
});

  module.exports = router;

  