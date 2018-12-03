const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// User Model
const User = require('../../models/user');

// Test User route
router.get('/test', (req, res) => res.json({ msg: 'User route works!' }));

// POST User Registration
router.post('/register', (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  User.findOne({ email: email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists.' });
    } else if (!password) {
      return res.status(400).json({ password: 'You must provide a password.' });
    } else {
      const newUser = new User({
        email,
        password
      });

      bcrypt
        .hash(newUser.password, 10)
        .then(hash => {
          newUser.password = hash;
          newUser
            .save()
            .then(user =>
              res.status(201).json({
                id: user._id,
                user: user.email,
                createdAt: user.createdAt
              })
            )
            .catch(err => res.status(400).json({ error: err.message }));
        })
        .catch(err => res.json({ error: err }));
    }
  });
});

module.exports = router;
