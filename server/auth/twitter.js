const express = require('express');
const passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;
const jwt = require('jsonwebtoken');
// const { promisfy } = require('util');
const knex = require("../../db/knex");

const router = express.Router();
const callbackURL =
  process.env.NODE_ENV === "production"
    ? "https://www.deployedsite.com/auth/facebook/callback"
    : "/auth/twitter/callback";

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL
},
  function (tauth_token, tokenSecret, profile, callback) {

  profile = profile._json
  // console.log(profile)
  const artist = {
    twitter_id: profile.screen_name,
    profileImg: profile.profile_image_url_https,
    displayName: profile.name,
    bio: profile.description,
    tauth_token,
  };
  // console.log(artist);
    knex("artists")
      .where('twitter_id', artist.twitter_id )
      .first()
      .then(user => {
        if (user) {
          return knex('artists')
          .where('twitter_id', artist.twitter_id)
          .update(artist, '*')
        
        } else {

          return knex('artists')
            .insert(artist, '*', { approved: 1 }) // '1' = "Pending"
        }
        }).then(user => {
          callback(null, user[0]);
        }).catch(error => {
          callback(error);
        });
  }
));


  router.get("/twitter", 
  passport.authenticate("twitter"));

  router.get('/twitter/callback', (req, res, next) => {
    passport.authenticate("twitter", (err, user) => {
      if (err) {
        return next(err);
      } else {
        const payload = {
          twitter_id: user.twitter_id,
          profileImg: user.profileImg,
          displayName: user.displayName,
          bio: user.bio
        };
        // console.log(payload)
        jwt.sign(payload, process.env.TWITTER_TOKEN_SECRET, {
          expiresIn: '1d'
        }, (err, token) => {
          if (err) {
            next(err)
          } else {
            res.cookie('token', token)
            res.redirect('/login.html');
          }
        });
      }
    })(req, res, next);
  });

  module.exports = router;
