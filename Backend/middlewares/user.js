const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    console.log(token);
  }
  next();
}

module.exports = { requireAuth };
