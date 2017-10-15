const Sequelize = require('sequelize');

const sequelize = require('../_db');

const Buildings = sequelize.define('Buildings', {
	xCoord: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	yCoord: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	latitude: {
		type: Sequelize.DECIMAL,
		allowNull: false
	},
	longitude: {
		type: Sequelize.DECIMAL,
		allowNull: false
	},
	address: {
		type: Sequelize.STRING, // all uppercase
		allowNull: false
	},
	numberOfFloors: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	zip: Sequelize.INTEGER,
	ownerName: Sequelize.STRING,
	healthArea: Sequelize.STRING,
	fireCompany: Sequelize.STRING,
	policePrecinct: Sequelize.STRING,
});


Buildings.findAllWithinZips = (zipCodes = []) => {
	return Buildings.findAll({
        where: {
            zip: {
                $in: zipCodes
            }
        },
        raw: true
	})
}


module.exports = Buildings;

