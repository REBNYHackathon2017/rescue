import { environment } from 'config';

module.exports = environment === 'production' ?
  require('./configureStore.prod') :
  require('./configureStore.dev');