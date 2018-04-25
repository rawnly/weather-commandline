import Conf from 'conf';
import chalk from 'chalk';
import frun from 'first-run';
import dotenv from 'dotenv';
import { prompt } from 'inquirer';
import printBlock from '@splash-cli/print-block';

dotenv.config();

import getWeather from './libs/weather';
import { api, validateToken } from './libs/utils';

const config = new Conf();

/**
 * @name Client
 * @param {Object} flags
 */
export default async function ({
	full: fullFlag,
	restore: restoreFlag,
	settings: settingsFlag
} = {}) {
	// ON FIRST RUN SETUP TOKENS
	if (frun()) {
		config.set('forecast-token', process.env.FORECAST_TOKEN)
		config.set('ip-token', process.env.IP_TOKEN)
	}

	// FLAGS CHECK
	if (restoreFlag) {
		frun.clear();
		return printBlock('The token has been restored successfully!');
	} else if (settingsFlag) {
		await prompt([{
			name: 'forecastToken',
			message: 'DarkSky token: ',
			suffix: chalk`{dim (Empty for default token)}`,
			prefix: chalk.green('%'),
			validate: token => validateToken(token, 'forecast')
		}, {
			name: 'ipToken',
			message: 'IP Stack Token: ',
			prefix: chalk.green('%'),
			suffix: chalk`{dim (Empty for default token)}`,
			validate: token => validateToken(token, 'ip')
		}])

		return printBlock(chalk`{green Configuration completed!}`);
	}

	return getWeather(fullFlag);
}