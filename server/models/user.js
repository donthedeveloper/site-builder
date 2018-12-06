const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const Schema = mongoose.Schema;

// Email validator
const emailValidator = validate({
  validator: 'isEmail',
  message: 'Provide a proper email address.'
});

// Create User schema
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: emailValidator
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// Create User model from schema
const User = mongoose.model('User', UserSchema);

module.exports = User;
