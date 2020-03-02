const users = require('express').Router();
const { getSelfInfo } = require('../controllers/users');

users.get('/me', getSelfInfo);

module.exports = users;
