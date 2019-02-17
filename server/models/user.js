const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');

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
      required: [true, 'You must provide an email address.'],
      trim: true,
      unique: true,
      validate: emailValidator
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'You must provide a password.']
    }
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, {
  message: 'Email already exists.'
});

UserSchema.pre('save', function(next) {
  const password = this.password;
  if (password) {
    bcrypt
      .hash(password, 10)
      .then(hash => {
        this.password = hash;
        next();
      })
      .catch(err => next(err));
  } else {
    next();
  }
});

UserSchema.statics.authenticate = function(email, password) {
  return User.findOne({ email })
    .exec()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        return user;
      } else {
        throw {
          error: {
            message: 'Incorrect email and password combination.',
            name: 'AuthenticationError'
          }
        };
      }
    });
};

UserSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// Create User model from schema
const User = mongoose.model('User', UserSchema);

module.exports = User;
