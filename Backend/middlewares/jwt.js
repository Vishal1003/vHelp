const expressJwt = require("express-jwt");

function authJwt() {
    const secret = process.env.JWT_SECRET;
    return expressJwt({
        secret,
        algorithms: ["HS256"],
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: /\/api\/index(.*)/, methods: ["GET", "OPTIONS"] },
            "/api/user/login",
            "/api/user/register",
            "/api/vendor/login",
            "/api/vendor/register"
        ]
    });
}

async function isRevoked(req, payload, done) {
    if (!payload.isVendor) done(null, true);
    done();
}

module.exports = authJwt;
