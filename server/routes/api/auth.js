const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// User Model
const User = require('../../models/user');

// POST User Login
router.post('/login', (req, res) => {
  User.authenticate(req.body.email, req.body.password)
    .then(
      user => {
        req.session.userId = user._id;
        res.status(200).json(user);
      },
      err => {
        res.status(500).json(err);
      }
    )
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
