import got from 'got';
import chalk from 'chalk';
import Conf from 'conf';
import printBlock from '@splash-cli/print-block';

import { tempParser, windParser, geoLocate, api } from './utils';

const config = new Conf();

/**
 * @name getForecast
 * @description Get weather infos and print it
 * 
 * @param {Boolean} isFull - Display full data if true 
 */
export default async function (isFull = false, coords) {
  const geoLocation = await geoLocate();
  const { latitude: lat, longitude: long, all: { city } } = geoLocation;

  try {
    const { body: unparsedData } = await got(`https://api.darksky.net/forecast/${api.darkSky}/${lat},${long}?units=ca`)
    const { hourly: { summary }, currently: forecast } = JSON.parse(unparsedData);
    const { temperature, windSpeed } = forecast;


    if ( isFull ) {
      return printBlock(chalk`${city} - {dim ${summary}}`, '', tempParser(temperature), windParser(windSpeed));
    }
    
    return printBlock(summary);
  } catch (error) {
    throw error;
  }
}
