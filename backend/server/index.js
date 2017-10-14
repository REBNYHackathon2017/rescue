const app = require('express')();
const http = require('http').Server(app);

const { port } = require('../config');
const { communication: { sendResponse } } = require('../modules');

// Initialize body/xml parsing middleware
require('./middleware')(app);

app.get('/', (req, res) => res.status(200).send("HEY!!"));

// Initialize routing middleware
app.use('/api', require('./routes'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.log('Request reached error handling', err);
    res.sendStatus(err.status || 500);
});

http.listen(port, () => console.log(`The server is listening closely on port ${port}...`));

module.exports = http;
