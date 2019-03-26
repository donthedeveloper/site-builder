const express = require('express');

const router = express.Router();

// User Model
const User = require('../../models/user');

// POST User Registration
router.post('/', (req, res) => {
  const { email, password } = req.body;
  return User.create({ email, password })
    .then(
      (user) => {
        req.session.userId = user._id;
        res.status(201).json({ user: user.toJSON() });
      },
    )
    .catch(error => res.status(400).json({ error }));
});


module.exports = router;
