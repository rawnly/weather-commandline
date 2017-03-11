'use strict'
const got = require('got');
const chalk = require('chalk');
const show = require('./lib');
const token = "5884bb7f746da897d43f2189e5f3221a";

let darkskyAPI = 'https://api.darksky.net/forecast/' + token + '/';

function info(lat, long, type = 'short') {

  if ( type !== 'short' && type !== 'full' )  {
    return false
  } else {

    darkskyAPI = `${darkskyAPI + lat},${long}?units=ca`;

    got(darkskyAPI).then(({body}) => {
      const data = JSON.parse(body);

      const summary = data.currently.summary;
      const temp = show.temp(data.currently.temperature);
      const windspeed = show.wind(data.currently.windSpeed);

      const list = [
        `The ${chalk.magenta('Weather')} is ${summary.toLowerCase()}`,
        temp,
        windspeed
      ]

      if ( type === 'short' ) {
        console.log();
        console.log('------------------------');
        console.log('| ' + list[0] + ' |');
        console.log('------------------------');
        console.log();
      } else {
        console.log();
        list.map(x => {
          console.log(x);
        })
        console.log();
      }

    })

  }


}


module.exports = info;
