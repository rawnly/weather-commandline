#! /usr/bin/env node

import meow from 'meow';
import chalk from 'chalk';

import client from '../client';

const cli = meow(chalk`
  {bold Usage}
    {dim $} {green weather} {dim [options]}

  {bold Help}
    {yellow -f --full}       {dim # Display windspeed and temperature}
    {yellow -t --token}      {dim # Set your own darksky token}
    {yellow -r --restore}    {dim # Restore token to default}
`, {
  alias: {
    f: 'full',
    t: 'token',
    r: 'restore',
    h: 'help',
    v: 'version'
  }
})


client(cli.flags);