const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// User Model
const User = require('../../models/user');

// POST User Login
router.post('/login', login);

function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.authenticate(email, password, function(err, user) {
    if (err) {
      return res.json({ message: err.message });
    } else {
      return res.status(200).json(user);
    }
  });
}

module.exports = router;
