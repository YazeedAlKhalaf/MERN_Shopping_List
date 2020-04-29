const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.header("x-auth-token");

    // check for token
    if (!token) {
      return res.status(401).json({
        error: "No token, authorizaion denied!",
        statusCode: res.statusCode,
      });
    }

    // Verfiy token
    const decoded = jwt.verify(token, keys.tokenSecret);

    // Add user from payload
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).json({
      error: "Token is not valid!",
      statusCode: require.statusCode,
    });
  }
}

module.exports = auth;
