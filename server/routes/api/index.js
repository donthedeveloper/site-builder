const express = require('express');
const userApi = require('./user');
const userAuth = require('./auth');

const router = express.Router();

router.use('/user', userApi);
router.use('/auth', userAuth);

router.use((err, req, res, next) => next(err));

module.exports = router;
