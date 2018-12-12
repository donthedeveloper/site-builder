const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// User Model
const User = require('../../models/user');

// POST User Login
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  return User.findOne({ email }, (err, user) => {
    if (err) {
      return res.json(err);
    } else if (user && bcrypt.compareSync(password, user.password)) {
      return res.status(200).json({ user });
    } else {
      return res.status(400).json({
        message: 'Incorrect username and password combination.'
      });
    }
  });
});

module.exports = router;
