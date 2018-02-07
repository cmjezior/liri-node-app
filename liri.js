require("dotenv").config();

var keyfile = require('key.js');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var inputString = process.argv;

var operand = inputString[2];
var inputContent = inputString[3];

var outputContent;

if (operand === "my-tweets") {
  outputContent =
}

else if (operand === "spotify-this-song") {
  outputContent =
}

else if (operand === "movie-this") {
  outputContent =
}

else if (operand === "do-what-it-says") {
  outputContent =
}

else {
  outputNum = "Not a recognized command";
}
