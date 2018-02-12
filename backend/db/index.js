'use strict';

const sequelize = require('./_db');

const { Reports, Buildings } = require('./models');

module.exports = {
	sequelize,
	Reports,
	Buildings
};
