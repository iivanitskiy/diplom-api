const routes = require('express').Router();

const articles = require('./articles');
const users = require('./users');

routes.use('/articles', articles);
routes.use('/users', users);

module.exports = routes;
