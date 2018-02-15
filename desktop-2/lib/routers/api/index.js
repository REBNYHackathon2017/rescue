import express from 'express';

export const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('You got me!');
});

router.use((error, req, res) => {
  console.log('fatal', 'Request reached error handling.', error);
  res.sendStatus(error.status || 500);
});

