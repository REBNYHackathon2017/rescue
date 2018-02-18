'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../_db');

const Reports = sequelize.define('Reports', {
	emergency: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	latitude: {
		type: Sequelize.STRING,
		allowNull: false
	},
	longitude: {
		type: Sequelize.STRING,
		allowNull: false
	},
	xCoord: Sequelize.INTEGER,
	yCoord: Sequelize.INTEGER,
	building: Sequelize.STRING, // address (all uppercase)
	floor: Sequelize.INTEGER,
	resource: {
		type: Sequelize.ENUM('police', 'fire', 'medical', 'nature', 'building', 'other'),
		allowNull: false
	},
	issue: {
		type: Sequelize.STRING,
		allowNull: false
	},
	details: Sequelize.TEXT,
	status: {
		type: Sequelize.ENUM('pending', 'confirmed', 'dispatched', 'resolved'),
		defaultValue: 'pending'
	},
	mobile: {
		type: Sequelize.STRING,
		defaultValue: '6467777777'
	},
	name: {
		type: Sequelize.STRING,
		defaultValue: 'Jon Jones'
	},
	img: {
		type: Sequelize.STRING,
		defaultValue: 'https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1493764650017/'
	}
});


module.exports = Reports;

