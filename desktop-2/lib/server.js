import express from 'express';
import chalk from 'chalk';

import config from './config';
import serverRender from 'renderers/server';
import { apiRouter } from 'routers';

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use('/api', apiRouter);

app.get('*', async (req, res) => {
  const initialMarkup = await serverRender();
  res.render('index', { initialMarkup });
});

app.listen(config.port, () => console.info(chalk.magenta(`The server is listening closely on port ${config.port}...`)));
