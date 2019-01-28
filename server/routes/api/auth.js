const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// User Model
const User = require('../../models/user');

// POST User Login
router.post('/login', (req, res) => {
  User.authenticate(req.body.email, req.body.password)
    .then(
      user => {
        req.session.userId = user._id;
        return res.status(200).json(user);
      },
      err => {
        return res.status(400).json(err);
      }
    )
    .catch(err => {
      return res.status(500).json(err);
    });
});

router.get('/logout', (req, res) => {
  if (req.session.userId) {
    req.session.destroy(err => {
      err ? res.status(500).json(err) : res.status(200)
    })
  }
  res.end()
});

router.post('/forgot', (req, res) => {
  console.log('req', req.body)
  User.findOne(req.body)
    .exec()
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found." })
      } else {
        user.resetPassword.token = crypto.randomBytes(20);
        user.resetPassword.expiration = Date.now() + 3600000;
        console.log('update user', user)
        return user
          .save()
          .then(result => {
            console.log(result)
            res.status(201).json({ message: "success!" })
          })
          .catch(err => {
            console.log(err)
            res.status(500).json(err)
          })
      }
    })
    .catch(err => res.status(500).json(err))
})

module.exports = router;
