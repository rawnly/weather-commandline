#!/usr/bin/env node
/**
 * Module dependencies.
 */

var request = require('request');
var chalk = require('chalk');
var program = require('commander');
var clear = require('clear');

/**
 * Variables
 */

const token = "5884bb7f746da897d43f2189e5f3221a";
const author = "Rawnly";

/**
 * Commander setup
 */

program
.version('0.1.1');

program.parse(process.argv);


/**
* Functions
*/

function checkStatus() {
  var url = 'https://api.darksky.net/forecast/' + token + '/49,12';

  request(url, function (error , response , body) {
    if ( error ) {
      console.log(error);
    }
    if ( !error && response.statusCode == 200 ) {
      const data = body ? JSON.parse(body) : null;
      var status = 'online';
      console.log('Server is ' + status);
    }
  });
}

function showTemp(t) { // numeric
  if ( t < 20 ) {
    console.log('Current temperature => ' + chalk.blue(t + ' C') );
  } else if ( t > 26 ) {
    console.log('Current temperature => ' + chalk.red(t + ' C'));
  } else {
    console.log('Current temperature => ' + chalk.yellow(t + ' C'));
  }
}

function windSpeed(s) { // numeric
  if ( s < 13 ) {
    console.log('Current wind => ' + chalk.green(s + ' Km/h') );
  } else if ( s > 23 ) {
    console.log('Current wind => ' + chalk.red(s + ' Km/h'));
  } else {
    console.log('Current wind => ' + chalk.yellow(s + ' Km/h'));
  }
}

/**
 * Get latitude and longitude
 */

request('http://freegeoip.net/json/', function (error, response, body) {
  if ( error ) {
    console.log("Error. Check your connection!");
  }


  if (!error && response.statusCode == 200) {
    const data = JSON.parse(body);

    var lat = data.latitude;
    var long = data.longitude;

    info(lat, long);
  }
});

/**
 * Get weather summary windspeed and temperature
 */
function info(lat, long) {
  request('https://api.darksky.net/forecast/' + token + '/' + lat + ',' + long + '?units=ca', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);

      var summary = data.currently.summary;
      var temp = data.currently.temperature;
      var windspeed = data.currently.windSpeed;

      console.log(summary);
      showTemp(temp);
      windSpeed(windspeed);

    }
  });
}
