'use strict';

const router = require('express').Router();

router.use('/reports', require('./reports'));
router.use('/buildings', require('./buildings'));

module.exports = router;
