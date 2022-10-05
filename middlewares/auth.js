const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../errors');
const { authorizationErrorMessage, JWT_SECRET, NODE_ENV } = require('../utils/constants');
const { JWT_SECRET_DEV } = require('../utils/config');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    return next(new AuthorizationError(authorizationErrorMessage));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
