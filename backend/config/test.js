module.exports = {
    port: process.env.PORT || 3002,
    dbConfig: {
        uri: 'postgres://localhost:5432/hackathon' // 'postgres://postgres:null@localhost:5432/postgres'
    }
};
