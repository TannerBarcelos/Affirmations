const jwt = require('jsonwebtoken');

// Generates a JWT token for user authorization of protected routes. We can sign
// anything but we chose to keep it simple and only used a logged in users ID as the
// data to sign. This will make it easy when doing queries in protected routes by using the
// findById() method and the JWT which will be sent in all requests as an auth header!
const generateToken = (userID) => {
  return jwt.sign({ id: userID }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
