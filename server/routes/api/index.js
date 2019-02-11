const express = require('express');
const userApi = require('./user');
const userAuth = require('./auth');

const router = express.Router();

router.use('/user', userApi);
router.use('/auth', userAuth);

module.exports = router;
