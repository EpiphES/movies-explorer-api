const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../errors');
const { authorizationErrorMessage, JWT_SECRET } = require('../utils/constants');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthorizationError(authorizationErrorMessage));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
