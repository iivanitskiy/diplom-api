const routes = require('express').Router();

const auth = require('../middlewares/auth');
const signIn = require('./signIn');
const signUp = require('./signUp');

const articles = require('./articles');
const users = require('./users');

routes.use('/signin', signIn);
routes.use('/signup', signUp);

routes.use(auth);

routes.use('/articles', articles);
routes.use('/users', users);

module.exports = routes;
