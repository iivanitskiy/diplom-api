const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = require('../config');
const ErrorAuth = require('../errors/errorAuth');
const ErrorForbidden = require('../errors/errorForbidden');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    throw new ErrorAuth('Необходима авторизация');
  }
  const token = cookie;
  let payload;
  try {
    payload = jwt.verify(token, JWT_TOKEN);
  } catch (err) {
    throw new ErrorForbidden('Доступ запрещен');
  }
  req.user = payload;
  next();
};
