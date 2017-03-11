#! /usr/bin/env node
'use strict';

const got = require('got');
const chalk = require('chalk');
const meow = require('meow');
const pkg = require('./package.json');
const show = require('./libs/lib');
const info = require('./libs/info');

const token = "5884bb7f746da897d43f2189e5f3221a";
const darkskyAPI = 'https://api.darksky.net/forecast/' + token + '/';

const cli = meow(`

  Usage
    $ weather [--options]

  Help
    -f --full       # Display windspeed and temperature
    -t --token      # Set your own darksky token

`, {
  alias: {
    f: 'full',
    t: 'token'
  }
})

function weather(actions, flags) {
  if (flags.full) {

    got('http://freegeoip.net/json/').then(({body}) => {
      const data = JSON.parse(body);
      info(data.latitude, data.longitude, 'full');
    })

  } else if (flags.token) {
    console.log();
    console.log(token);
    console.log();
  } else {
    got('http://freegeoip.net/json/').then(({body}) => {
      const data = JSON.parse(body);

      info(data.latitude, data.longitude, 'short');
    })
  }
}

weather(cli.input[0], cli.flags)
