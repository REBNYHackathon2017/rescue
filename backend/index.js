'use strict';

const Promise = require('bluebird');

const { sequelize } = require('./db');
const io = require('./io');

(async function kickOff() {
	
	try {
		await sequelize.sync()
		console.log('DB Synced!');

		const server = require('./server');
		io(server);
		console.log('Backend Server Up and Running');

	} catch(err) {
		console.log('Error Starting Backend Server', err);

		// Try again after 5 seconds
		await Promise.delay(5000);
		kickOff();
	}
})();
