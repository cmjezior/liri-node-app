require("dotenv").config();
var keys = require('./keys.js');
var action = process.argv[2];
var value = process.argv[3];
var request = require('request');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var params = {
    screen_name: 'UxJezior',
    count: 20
    }

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

if (action === "movie") {
    movieFn();
}
else if (action === "song") {
    spotifyFn();
}
else if (action === "tweets") {
    twitterFn();
}
else if (action === "idk") {
    value = require('./random.txt')
    spotifyFn();
}
else {
  console.log("yeah... that's not one of your options")
}

// Defines spotifyFN
function spotifyFn() {
  spotify
 .search({ type: 'track', query: value })
     .then(function(data) {
      console.log('\r\n=============== You searched for: ' + value + ": ===============\r\n")
      console.log('Artist: ' + data.tracks.items[0].artists[0].name);
      console.log('Track Name: ' + data.tracks.items[0].name);
      console.log('Preview Song: ' + data.tracks.items[0].preview_url);
      console.log('Album: ' + data.tracks.items[0].album.name);
      console.log('\r\n=============== You searched for: ' + value + " ================\r\n")
    })
};

// Defines twitterFn
function twitterFn() {
  // gets last 20 tweets + when they were created
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error && response.statusCode == 200) {
          console.log('\r\n=============== Last 20 Tweets by ' + params.screen_name + ": ===============\r\n")
          for (i = 0; i < tweets.length; i++) {
              var number = i + 1;
              console.log(' ');
              console.log([i + 1] + '. ' + tweets[i].text);
              console.log('Created on: ' + tweets[i].created_at);
          }
              console.log('\r\n=============== Last 20 Tweets by ' + params.screen_name + " ================\r\n")
      }
  });
};

// Defines movieFn
function movieFn() {
  // OMDB API Request
  var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&tomatoes=true&apikey=trilogy";
  // OMDB API Request Function
  request(queryUrl, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
      console.log("\r\n================== " + JSON.parse(body).Title + " =================\r\n");
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
      console.log("Country of Production: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Top Billed Actors: " + JSON.parse(body).Actors);
      console.log("\r\n================== " + JSON.parse(body).Title + " =================\r\n");
    }
  });
}
