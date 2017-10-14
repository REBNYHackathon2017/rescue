'use strict';

const env = process.env.NODE_ENV;

module.exports = (env === 'test') ? 
	require('./test') : 
	require('./production');
