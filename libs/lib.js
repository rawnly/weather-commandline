const chalk = require('chalk');

module.exports = {
  temp: (t) => {
    if ( t < 20 ) {
      return 'Current temperature => ' + chalk.blue(`${t} C`)
    } else if ( t > 26 ) {
      return 'Current temperature => ' + chalk.red(`${t} C`)
    } else {
      return 'Current temperature => ' + chalk.green(`${t} C`)
    }
  },
  wind: (s) => {
    if ( s < 13 ) {
      return 'Current wind => ' + chalk.green(s + ' Km/h') 
    } else if ( s > 23 ) {
      return 'Current wind => ' + chalk.red(s + ' Km/h')
    } else {
      return 'Current wind => ' + chalk.yellow(s + ' Km/h')
    }
  }
}
