const expressJwt = require('express-jwt');

function authJwt() {
  const secret = process.env.JWT_SECRET;
  return expressJwt({
    secret,
    algorithms: ['HS256'],
  }).unless({
    path: [
      '/api/user/login',
      '/api/user/register',
      '/api/vendor/login',
      '/api/vendor/register',
    ],
  });
}

module.exports = authJwt;
