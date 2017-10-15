const { Reports } = require('../models');
const sequelize = require('../_db');

sequelize.sync()
	.then(() => Reports.findAll())
	.then(reports => console.log(`This many: ${reports.length}, ex: ${reports[0]}`))
	.catch(err => console.log(`Error fetching reports: ${err}`));