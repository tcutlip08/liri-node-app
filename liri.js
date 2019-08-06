var modifiedArray = [];
for (let i = 2; i < process.argv.length; i++) {
    modifiedArray.push(process.argv[i]);
}
var com = modifiedArray[0];

// require("dotenv").config();
// var keys = require('keys.js');
// var inquirer = require("inquirer");
var axios = require('axios');
var moment = require('moment');
// var spotify = new Spotify(keys.spotify);

if (com === "concert-this") {
    var artist = modifiedArray[1];
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    // var data = callAxios(queryUrl);
    axios.get(queryUrl)
        .then(function (response) {
            // console.log(response);
            var data = response.data;
            console.log(data);

            for (let i = 0; i < data.length; i++) {
                console.log("\n--------------------\n");
                console.log("Venue: " + data[i].venue.name);
                console.log("Location: " + data[i].venue.city + ", " + data[i].venue.region);
                // console.log("Venue: " + data[i].venue.name);
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
    console.log("2");
} else if (com === "movie-this") {
    console.log("3");
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