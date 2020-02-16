const routes = require('express').Router();

const articles = require('./articles');
const users = require('./users');
const signIn = require('./signIn');
const signUp = require('./signUp');

routes.use('/articles', articles);
routes.use('/users', users);
routes.use('/signin', signIn);
routes.use('/signup', signUp);

module.exports = routes;
