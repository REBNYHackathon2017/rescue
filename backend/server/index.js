const cors = require('cors');
const path = require('path');
const app = require('express')();
const http = require('http').Server(app);

const { port } = require('../config');
const { communication: { sendResponse } } = require('../modules');

app.use(cors());


// Initialize body/xml parsing middleware
require('./middleware')(app);

app.get('/', (req, res) => res.status(200).send("HEY!!"));
app.get('/socket', (req, res) => res.status(200).sendFile(path.join(__dirname, '../index.html')));

// Initialize routing middleware
app.use('/api', require('./routes'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.log('Request reached error handling', err);
    res.sendStatus(err.status || 500);
});

http.listen(port, () => console.log(`The server is listening closely on port ${port}...`));

module.exports = http;
