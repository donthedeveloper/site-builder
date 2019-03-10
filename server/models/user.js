const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

// Email validator
const emailValidator = validate({
  validator: 'isEmail',
  message: 'Provide a proper email address.',
});

// Create User schema
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'You must provide an email address.'],
      trim: true,
      unique: true,
      validate: emailValidator,
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'You must provide a password.'],
    },
    resetPassword: {
      token: String,
      expiration: Date,
    },
  },
  { timestamps: true },
);

UserSchema.plugin(uniqueValidator, {
  message: 'Email already exists.',
});

UserSchema.pre('save', function save(next) {
  const { password } = this;
  if (password) {
    bcrypt
      .hash(password, 10)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch(err => next(err));
  } else {
    next();
  }
});

UserSchema.statics.authenticate = function authenticate(email, password) {
  return this.findOne({ email })
    .exec()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        return user;
<<<<<<< HEAD
      } throw new Error('Incorrect email and password combination.');
=======
      }
      throw Error('Incorrect email and password combination.');
>>>>>>> 65ca85786dde2aa35709536616d6ac22e2c169dd
    });
};

UserSchema.methods.toJSON = function toJson() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
// Create User model from schema
const User = mongoose.model('User', UserSchema);
module.exports = User;
