const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

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
  User.findOne(req.body)
    .exec()
    .then(user => {
      if (!user) {
        return res.status(200).end()
      } else {
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPassword.token = token
        user.resetPassword.expiration = Date.now() + 3600000;
        user.save()

        let smtpTransport = nodemailer.createTransport({
          host: 'smtp.sendgrid.net',
          port: 587,
          auth: {
            user: 'apikey',
            pass: process.env.SG_PASS
          }
        })

        let mailOptions = {
          from: process.env.PASSWORD_RESET_AUTH_EMAIL,
          to: user.email,
          subject: 'Forgot Password Request',
          html: `<p>You are receiving this because you, or someone else, requested a password reset. Click <a href="http://localhost:${process.env.PORT}/reset/${token}">here</a> to finish resetting your password.</p>`
        };

        smtpTransport.sendMail(mailOptions, function (err) {
          if (err) {
            res.status(500).json({ error: err })
          }
          res.status(200).end()
        });
      }
    })
    .catch(err => res.status(500).json(err))
})

module.exports = router;
