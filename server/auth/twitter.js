const express = require('express');
const router = express.Router();
const passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;
const jwt = require('jsonwebtoken');
const { promisfy } = require('util');
const knex = require("../../db/knex");

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

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: "/auth/twitter/callback"
},
  function (token, tokenSecret, profile, done) {
    // console.log(profile);
    // const signAsync = promisfy(jwt.sign);
    // const verifyAsync = promisify(jwt.verify);

    // Check database to see if user exists with twitter_id
    const user = profile._json;
    console.log(user)
    // console.log(user);
    // router.get('/', (req, res, next) => {
      knex("artists")
        .where('twitter_id', user.screen_name )
        .then(rows => {
          console.log(rows);
          if (rows.length === 0) {
            // ADD USER TO DB WITH PENDING STATUS
            console.log("That user does not exist in the database! Let's add them!")
            console.log(user.screen_name)
            knex('artists')
            .insert({
              twitter_id: user.screen_name,
              approved: 1 //pending
              // Add .then to redirect response to the pending approval component to be loaded.
              
            })
            .then(

            )
          } else {
            // console.log(res.send(rows))
            console.log(`I found ${user.screen_name}`)
          }
        })
        .catch(error => {
          console.error(error);
        });
    // });


    // If they do exist, update tauth_token to be token.

    // Else, insert them into the database with given twitter_id and token

    // When done, call done with user from database (as below)
    done(null, user)
    // done(null, {token, tokenSecret});
  }
));




  module.exports = router;

  