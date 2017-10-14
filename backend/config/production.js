module.exports = {
    port: process.env.PORT || 3002,
    dbConfig: {
        uri: 'postgres://postgres:mysecretpassword@db:5432/postgres'
    }
};
