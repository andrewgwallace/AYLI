"use strict";
require("dotenv").config({ path: __dirname + "./env" });
var Twitter = require("node-twitter-api")
const _ = require('lodash');
const secret = require('secret');
  Promise = require("bluebird");

//   const twitter = new Twitter({
//     consumerKey: process.env.TWITTER_KEY,
//     consumerSecret: process.env.TWITTER_SECRET,
//     callback: 'http://localhost:3004/callback'
//   });

//  requestToken = async () => {
//     ((resolve, reject) => {
//       twitter.getRequestToken((err, requestToken, requestSecret) => {
//         if (err) {
//           reject(err);
//         }
//         else {
//           this.requestToken = requestToken;
//           this.requestSecret = requestSecret;
//           resolve(requestToken);
//         }
//       })
//     }) 
//   }

//   accessToken = async () => {
//     const secret = this.requestSecret;
//     this.verifier = verifier;

//     ((resolve, reject) => {
//       twitter.getAccessToken(token, secret, verifier, (err, accessToken, accessSecret) => {
//         if (err) {
//           reject(err)
//         }
//         else {
//           this.requestToken = accessToken;
//           this.requestSecret = accessSecret;
//           resolve(accessToken);
//         }
//       })
//     })
//   }

//   verifyCredentials = async (accessToken) => {
//     let accessSecret = this.accessSecret;
//     await ((resolve, reject) => {
//       twitter.verifyCredentials(accessToken, accessSecret, (err, user) => {
//         if (err) {
//           reject(err);
//         }
//         else {
//           resolve(user);
//         }
//       })
//     })
//   }

//   module.exports = {
//     requestToken,
//     accessToken,
//     verifyCredentials
//   }
  

// ES5 

module.exports = function (app) {
  _.each([
    "request-token",
    "access-token"
  ]);


this.verifyCredentials = function (accessToken) {
  var accessSecret = this._accessSecret;

  return new Promise(function (resolve, reject) {
    this._twitter.verifyCredentials(accessToken, accessSecret, function (err, user) {
      if (err) reject(err);
      else resolve(user);
    });
  }.bind(this));
};


module.exports = new function () {
  this._twitter = new Twitter({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callback: "http://localhost:3004/callback"
  });


this.accessToken = function (token, verifier) {
  var secret = this._requestSecret;

  this._verifier = verifier;

  return new Promise(function (resolve, reject) {
    this._twitter.getAccessToken(token, secret, verifier, function (err, accessToken, accessSecret) {
      if (err)
        reject(err);
      else {
        this._accessToken = accessToken;
        this._accessSecret = accessSecret;
        resolve(accessToken);
      }
    });
  }.bind(this));
};


  this.requestToken = function () {
    return new Promise(function (resolve, reject) {
      this._twitter.getRequestToken(function (err, requestToken, requestSecret) {
        if (err)
          reject(err);
        else {
          this._requestToken = requestToken;
          this._requestSecret = requestSecret;
          resolve(requestToken);
        }
      }.bind(this));
    }.bind(this));
  }; 
};
};