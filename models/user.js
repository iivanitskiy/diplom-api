const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const ErrorAuth = require('../errors/errorAuth');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.methods.omitPrivate = function omitPrivate() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.statics.findUserByCredentials = function func(email, password) {
  const authError = new ErrorAuth('Неправильные почта или пароль');

  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw authError;
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw authError;
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
