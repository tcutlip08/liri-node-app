var modifiedArray = [];
for (let i = 2; i < process.argv.length; i++) {
    modifiedArray.push(process.argv[i]);
}
var com = modifiedArray[0];
var parameterArray = [];

for (let i = 1; i < modifiedArray.length; i++) {
    parameterArray.push(modifiedArray[i]);
}

require("dotenv").config();
var keys = require('./keys');
var inquirer = require("inquirer");
var axios = require('axios');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


if (com === "concert-this") {
    var artist = parameterArray.join("+");
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events/?app_id=codingbootcamp";
    // var data = callAxios(queryUrl);
    axios.get(queryUrl)
        .then(function (response) {
            // console.log(response);
            var data = response.data;
            console.log(data);


            for (let i = 0; i < data.length; i++) {
                console.log("\n--------------------\n");
                console.log("Venue: " + data[i].venue.name);
                console.log("Location: " + data[i].venue.city + ", " + data[i].venue.region + " " + data[i].venue.country);
                var arrayDate = data[i].datetime.split("T");
                var modifyDate = arrayDate[0].split("-").join("");
                var modifyTime = parseInt(arrayDate[1].split(":"));
                if (!modifyTime[1]) {
                    var minutes = "00";
                } else {
                    var minutes = modifyTime[1];
                }
                var time;
                if (modifyTime > 12) {
                    time = modifyTime - 12 + ":" + minutes + " P.M.";
                } else if (modifyTime !== 12) {
                    time = modifyTime + ":" + minutes + " A.M.";
                } else {
                    time = modifyTime + ":" + minutes + " P.M.";
                }
                var date = moment(modifyDate).format("MMMM Do YYYY");
                console.log("Date: " + date + " @ " + time);
            }

        }).catch(function (error) {
            if (error.response) {
                console.log('---------------Data---------------');
                console.log(error.response.data);
                console.log('---------------Status---------------');
                console.log(error.response.status);
                console.log('---------------Status---------------');
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
} else if (com === "spotify-this-song") {
    var song = parameterArray.join("+");
    if (!song) {
        song = "The+Sign";
    }
    // console.log(song);

    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0]);
        console.log("--------------------");
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].external_urls.spotify);
        console.log("--------------------");

    });
} else if (com === "movie-this") {
    var movieName = parameterArray.join("+");
    if (!movieName) {
        movieName = "Mr+Nobody";
    }
    var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy';

    axios.get(queryUrl)
        .then(function (response) {
            // console.log(response)
            var data = response.data;
            console.log(data);

            // * Title of the movie.
            console.log(data.Title);
            // * Year the movie came out.
            console.log(data.Year);
            // * IMDB Rating of the movie.
            console.log(data.Rated);
            // * Rotten Tomatoes Rating of the movie.
            console.log(data.Ratings[1].Value);
            // * Country where the movie was produced.
            console.log(data.Country);
            // * Language of the movie.
            console.log(data.Language);
            // * Plot of the movie.
            console.log(data.Plot);
            // * Actors in the movie.
            console.log(data.Actors);
        }).catch(function (error) {
            if (error.response) {
                console.log('---------------Data---------------');
                console.log(error.response.data);
                console.log('---------------Status---------------');
                console.log(error.response.status);
                console.log('---------------Status---------------');
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
} else if (com === "do-what-it-says") {
    console.log("4");
} else {
    console.log("Please use a proper command (Check README for more info)");
}

// function callAxios(url) {
//     axios.get(url)
//         .then(function (response) {
//             // console.log(response);
//             var data = response.data;
//             console.log(data);
//             return data;

//         }).catch(function (error) {
//             if (error.response) {
//                 console.log('---------------Data---------------');
//                 console.log(error.response.data);
//                 console.log('---------------Status---------------');
//                 console.log(error.response.status);
//                 console.log('---------------Status---------------');
//                 console.log(error.response.headers);
//             } else if (error.request) {
//                 console.log(error.request);
//             } else {
//                 console.log('Error', error.message);
//             }
//             console.log(error.config);
//         });
// }