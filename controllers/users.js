const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_TOKEN } = require('../config');

const ErrorMiss = require('../errors/errorMiss');
const ErrorConflict = require('../errors/errorConflict');
const ErrorValidation = require('../errors/errorValidation');

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  const userModel = new User({
    email, password, name,
  });

  const validate = userModel.validateSync();
  if (validate) {
    const errorMessage = Object.values(validate.errors)
      .map((error) => error.message);
    next(new ErrorValidation(errorMessage));
    return;
  }

  User.findOne({ email })
    .then((object) => {
      if (object) {
        throw new ErrorConflict('Email exists');
      }
      return bcrypt.hash(userModel.password, 10)
        .then((hash) => {
          userModel.password = hash;
          return User.create(userModel);
        })
        .then((user) => res.send({ data: user.omitPrivate() }));
    })
    .catch(next);
};

module.exports.getSelfInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (user === null) {
        throw new ErrorMiss('Пользователь не найден');
      }
      return res.json({ data: user });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_TOKEN, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: false,
          domain: '',
          // sameSite: true,
        })
        .json({ name: user.name })
        .end();
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  res.status(200).clearCookie('jwt', {
    httpOnly: true,
    domain: '',
    // sameSite: true,
  })
    .end();
};
