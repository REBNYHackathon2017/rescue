const { Reports } = require('../models');
const sequelize = require('../_db');

Reports.sync({ force: true })
	.then(() => console.log('Reports synced.'))
	.catch(err => console.log(`Error fetching buildings: ${err}`));