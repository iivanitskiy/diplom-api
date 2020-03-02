const signUp = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');

signUp.post('/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().min(3).max(100),
      password: Joi.string().required().min(8).max(100),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  createUser);

module.exports = signUp;
