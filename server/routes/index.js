const express = require('express');
const path = require('path');

const apiRouter = require('./api');

const router = express.Router();

router.use('/api', apiRouter);

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../browser/dist/index.html'));
});


module.exports = router;
