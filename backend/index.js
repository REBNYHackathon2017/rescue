const { sequelize } = require('./db');
const io = require('./io');
const { helpers: { delay } } = require('./modules');

const kickoff = () => {
	
	sequelize.sync()
	.then(() => console.log('DB Synced!'))
	.then(() => {
		const server = require('./server');
		io(server);
	})
	.then(() => console.log('Backend Server Up and Running'))
	.catch(err => {
		console.log('Error Starting Backend Server', err);
		delay().then(kickoff);
	});
};

// GO
kickoff();
