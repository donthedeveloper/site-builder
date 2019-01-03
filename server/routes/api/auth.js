const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// User Model
const User = require('../../models/user');

// POST User Login
router.post('/login', login);

function login(req, res) {
  User.authenticate(req.body.email, req.body.password)
    .then(
      user => {
        res.status(200).json(user);
      },
      err => {
        res.status(500).json(err);
      }
    )
    .catch(err => {
      res.status(500).json(err);
    });
}

module.exports = router;
