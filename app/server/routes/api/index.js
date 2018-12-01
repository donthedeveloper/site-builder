const express = require('express');
const userApi = require('./user');

const router = express.Router();

router.use('/user', userApi);

module.exports = router;