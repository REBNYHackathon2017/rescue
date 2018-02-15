
module.exports = {
  host: process.env.HOST || 'localhost',
  environment: process.env.HOST || process.env.NODE_ENV,
  port: process.env.NODE_ENV === 'production' ? 8080 : 3000,
  route: process.env.NODE_ENV === 'production' ? 'http://34.204.33.48:3002/api' : 'http://localhost:3002/api',
};
