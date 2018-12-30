const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// User Model
const User = require('../../models/user');

// POST User Login
router.post('/login', login);

function login(req, res) {
  User.authenticate(req.body.email, req.body.password, function(err, user) {
    if (err) {
      return res.json({ message: err.message });
    } else {
      return res.status(200).json(user);
    }
  });
}

module.exports = router;
