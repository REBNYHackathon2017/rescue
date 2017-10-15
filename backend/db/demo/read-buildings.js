const { Buildings } = require('../models');
const sequelize = require('../_db');

sequelize.sync()
	.then(() => Buildings.findAll())
	.then(buildings => console.log(`This many: ${buildings.length}, ex: ${JSON.stringify(buildings[0].get())}`))
	.catch(err => console.log(`Error fetching buildings: ${err}`));