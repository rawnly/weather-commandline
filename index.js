#! /usr/bin/env node
'use strict';

const got = require('got');
const chalk = require('chalk');
const meow = require('meow');
const inquirer = require('inquirer');
const Conf = require('conf');
const firstRun = require('first-run');
const pkg = require('./package.json');
const show = require('./libs/lib');
const info = require('./libs/info');

const config = new Conf();
const prompt = inquirer.prompt;

const token = config.get('token') || '5884bb7f746da897d43f2189e5f3221a';
const darkskyAPI = 'https://api.darksky.net/forecast/' + token + '/';

const cli = meow(`

  Usage
    $ weather [--options]

  Help
    -f --full       # Display windspeed and temperature
    -t --token      # Set your own darksky token
    -r --restore    # Restore token to default

`, {
  alias: {
    f: 'full',
    t: 'token',
    r: 'restore',
    h: 'help',
    v: 'version'
  }
})

if ( firstRun() ) {
  config.set('token', '5884bb7f746da897d43f2189e5f3221a')
}

function weather(actions, flags) {
  if (flags.restore) {
    config.set('token', '5884bb7f746da897d43f2189e5f3221a');
    console.log('');
    console.log('The token has been restored successfully!');
    console.log('');
  } else if (flags.full) {

    got('http://freegeoip.net/json/').then(({body}) => {
      const data = JSON.parse(body);
      info(data.latitude, data.longitude, 'full');
    })

  } else if (flags.token) {

    prompt([
      {
        name: 'toktok',
        message: 'New Token:',
        default: '5884bb7f746da897d43f2189e5f3221a',
        validate: (val) => {
          const tk = '5884bb7f746da897d43f2189e5f3221a';
          if (val.length < tk.length) {
            return 'Invalid token. Too short!'
          } else if (val.length > tk.length) {
            return 'Invalid token. Too long!'
          } else {
            return true
          }
        }
      }
    ]).then(answ => {
      if (answ.toktok) {
        console.log('');
        console.log(`New Token! "${chalk.green(answ.toktok)}" `);
        console.log('');
        config.set('token', answ.toktok)
      }
    })

  } else {
    got('http://freegeoip.net/json/').then(({body}) => {
      const data = JSON.parse(body);

      info(data.latitude, data.longitude, 'short');
    }).catch((err) => {
      throw new Error(err)
    })
  }
}

weather(cli.input[0], cli.flags)
