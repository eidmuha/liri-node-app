//  loads environment variables from .env file into process.env
require("dotenv").config();

// load the chalk modules for text colors on the terminal
const chalk = require('chalk');

// loads the keys for spotify
var keys = require("./keys.js");

// loads the spotify api
var Spotify = require('node-spotify-api');

// loads the axios api
const axios = require('axios');

// nod fs module for reading and writing files
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
// console.log (keys.spotify);

// Join them into a string to get the space delimited address
var argument = process.argv.slice(3).join(" ");

// assign commands given
var command = process.argv[2];

// initiate the program
init();

// main function that takes the command and 
// execute them accordingly
function init(){
    switch (command) {
        case "concert-this":
            concert();
            break;
        case "spotify-this-song":
            if (argument=='') {
                argument = "Ace of Base"
                spotifyThisSong();
            }
            break;
        case "movie-this":
            if (argument=='') {
                argument = 'Mr. Nobody'
                movieThis()
            }
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        case "q":
            
            break;
                
        default:
            console.log("\n")
            console.log(chalk.red("=====Command not recognised!====="))

            display();   
            break;
    }
}


// using Bands in Town API
function concert() {
    var url = "https://rest.bandsintown.com/artists/" + argument + "/events?app_id=codingbootcamp"

    axios.get(url)
    .then(function (response) {
    // console.log(response.data[0].datetime)
    response.data.forEach(element => {
        console.log(element.venue.name)
        console.log(element.venue.city)
        console.log(element.datetime)

        console.log("========================================")
    });

    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
    .finally(function () {
    // always executed
    });

}

// using spotigy API
function spotifyThisSong(){
    spotify
        .search({ type: 'track', query: argument })
        .then(function(response) {
            console.log('\x1b[36m%s\x1b[0m',"=============SONGS' DETAILS=======================\n")
            console.log(chalk.red("\tARTIST(S):"))
            response.tracks.items[0].artists.forEach(function (value, i) {
                console.log('\t  %d: %s', i+1, value.name);
            });
            console.log(chalk.red("\tNAME: ")+response.tracks.items[0].name)
            console.log(chalk.red("\tLINK: ")+response.tracks.items[0].preview_url)
            console.log(chalk.red("\tALBUM: ")+response.tracks.items[0].album.name)
            console.log("\n")
        })
        .catch(function(err) {
            console.log(err);
        });
}

// using axios and OMDB API
function movieThis(){
    // Make a request for a user with a given ID
    axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy")
    .then(function (response) {
    // handle success
        console.log(response.data.Title);
        console.log(response.data.Released);
        console.log(response.data.imdbRating);
        console.log(response.data.Ratings[1].Value);
        console.log(response.data.Country);
        console.log(response.data.Language);
        console.log(response.data.Plot);
        console.log(response.data.Actors);

    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
    .finally(function () {
    // always executed
    });
}
 
// using the fs module
function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }

        var dataArr = data.split(",");
        command = dataArr[0];
        argument = dataArr[1];

        spotifyThisSong()
      
      });
}

// display on the command prompt
function display(){
    console.log(chalk.yellow.underline.bold("Please use one of the following commands:"))
    console.log(chalk.blue('\tconcert-this')+" to find the bands in the town")
    console.log(chalk.blue('\tspotify-this-song') + " to get the song details")
    console.log(chalk.blue('\tmovie-this')+ " to movie details")
    console.log(chalk.blue('\tdo-what-it-says') + " to allow LIRI talk to to random.txt")
    console.log(chalk.blue('\tq') + " to quit the terminal\n")
}
 






