const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

// User Model
const User = require('../../models/user')

// POST User Login
router.post('/login', (req, res) => {
  return User.authenticate(req.body.email, req.body.password)
    .then(
      user => {
        req.session.userId = user._id
        return res.status(200).json(user)
      },
      err => {
        return res.status(400).json(err)
      }
    )
    .catch(err => {
      return res.status(500).json(err)
    })
})

module.exports = router
