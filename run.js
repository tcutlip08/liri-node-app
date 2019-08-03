var modifiedArray = [];
for (let i = 2; i < process.argv.length; i++) {
    modifiedArray.push(process.argv[i]);
}

var keys = require('keys.js');

var com = modifiedArray[0];



var axios = require('axios');