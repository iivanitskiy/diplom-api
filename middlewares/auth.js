const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = require('../config');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  const token = cookie;
  let payload;
  try {
    payload = jwt.verify(token, JWT_TOKEN);
  } catch (err) {
    return res
      .status(403)
      .send({ message: 'Доступ запрещен' });
  }
  req.user = payload;
  next();
};
