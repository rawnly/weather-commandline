import chalk from 'chalk';
import got from 'got';
import Conf from 'conf';
import dotenv from 'dotenv';

dotenv.config();
const config = new Conf();

/**
 * API Keys config
 */
export const api = {
  darkSky: config.get('forecast-token') || process.env.FORECAST_TOKEN,
  ipStack: config.get('ip-token') || process.env.IP_TOKEN
}

/**
 * @name tempParser
 * @description Returns a sentence for temperature
 * 
 * @param {Number} temperature - Temperature provided by darksky
 */
export function tempParser(temperature) {
  const printer = (color) => `Temperature: ${chalk[color](temperature)} C`;

  if ( t < 20 ) return printer('cyan');
  if ( t > 26 ) return printer('red');
  
  return printer('green');
}

/**
 * @name windParser
 * @description Returns a sentence for windspeed
 * 
 * @param {Number} speed - Wind speed provided by darksky
 */
export function windParser(speed) {
  const printer = (color) => `Wind Speed: ${chalk[color](speed)} km/h`;

  if ( s < 13 ) return printer('green', s);
  if ( s < 23 ) return printer('red', s);

  return printer('yellow');
}

/**
 * @name geoLocate
 * @description Geolocate the user, usign ipstack
 */
export async function geoLocate() {
  try {
    const { body: unparsedData } = await got(`http://api.ipstack.com/check?access_key=${api.ipStack}`);
    const { ip, latitude, longitude, location } = JSON.parse(unparsedData);

    return { ip, latitude, longitude, all: JSON.parse(unparsedData) };
  } catch (error) {
    throw error;
  }
}

/**
 * @name validateToken
 * @description Validate darksky/ipstack token
 * 
 * @param {String} token - The token
 * @param {String} type - Token type: 'ip' or 'forecast'
 */
export function validateToken(token, type) {
  if ( !token.length ) return true;
  if (token.length < api.darkSky.length) return 'Invalid token. Too short!';
  if (token.length > api.darkSky.length) return 'Invalid token. Too long!';

  switch (type) {
    case 'ip':
      config.set('ip-token', token)
      break;
    case 'forecast':
      config.set('forecast-token', token)
      break;
    default:
      throw new TypeError('No tokenType defined.');
      break;
  }

  return true;
}