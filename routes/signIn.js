const signIn = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/users');

signIn.post('/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().min(3).max(100),
      password: Joi.string().required().min(8).max(30),
    }),
  }),
  login);

module.exports = signIn;
