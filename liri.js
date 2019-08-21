//  loads environment variables from .env file into process.env
require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

const axios = require('axios');

var spotify = new Spotify(keys.spotify);
console.log (keys.spotify);

spotify.search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });