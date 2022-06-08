const jwt = require('jsonwebtoken');

// Takes in userID of the user created / found in Mongo Lookup
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;

// Generates a JWT token for user authorization of protected routes. We can sign
// anything but we chose to keep it simple and only used a logged in users ID as the
// data to sign. This will make it easy when doing queries in protected routes by using the
// findById() method and the JWT which will be sent in all requests as an auth header!
