const express = require('express');

const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

// User Model
const User = require('../../models/user');

// POST User Login
router.post('/login', (req, res) => {
  User.authenticate(req.body.email, req.body.password)
    .then(
      (user) => {
        req.session.userId = user._id;
        return res.status(200).json(user);
      },
      err => res.status(400).json({
        error: {
          message: err.message,
          name: 'AuthenticationError',
        },
      }),
    )
    .catch(err => res.status(500).json(err));
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => (err ? res.status(500).json(err) : res.status(200).end()));
});

router.post('/forgot', async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).exec();
  if (!user) {
    return res.status(200).end();
  }
  const token = crypto.randomBytes(20).toString('hex');
  user.resetPassword.token = token;
  user.resetPassword.expiration = Date.now() + 3600000;
  try {
    await user.save();
  } catch (err) {
    return res.status(500).json({ error: err });
  }

  const smtpTransport = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
      user: 'apikey',
      pass: process.env.SG_PASS,
    },
  });

  const mailOptions = {
    from: process.env.PASSWORD_RESET_AUTH_EMAIL,
    to: user.email,
    subject: 'Forgot Password Request',
    html: `<p>You are receiving this because you, or someone else, requested a password reset. Click <a href="http://localhost:${process.env.PORT}/reset/${token}">here</a> to finish resetting your password.</p>`,
  };
  try {
    await smtpTransport.sendMail(mailOptions);
    return res.status(200).end();
  } catch (err) {
    return res.status(500).end();
  }
});


module.exports = router;
