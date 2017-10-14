const socketio = require('socket.io');
let io;

module.exports = server => {
	if (io) return io;

	io = socketio(server);

	io.on('connection', socket => {
		console.log('HI!', socket);
	});

	return io;
};
