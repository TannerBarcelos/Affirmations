const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// This provides authorization on routes - every protected route requires an API token
const authorize = async (request, response, next) => {
  let apiToken;
  const authHeader = request.headers.authorization;
  try {
    if (authHeader && authHeader.startsWith('Bearer')) {
      try {
        apiToken = authHeader.split(' ')[1];
        const { id } = jwt.verify(apiToken, process.env.JWT_SECRET); // JWT stores the users ID as the signed data
        const foundUser = await User.findById(id).select('-password');
        if (foundUser) request.user = foundUser; // set user on the request object for using UserID in other endpoints for auth
        next();
      } catch (error) {
        console.log(error);
        response.status(401);
        throw new Error('User not authorized');
      }
    }
    if (!apiToken) {
      response.status(401);
      throw new Error('Not authorized - no API Token');
    }
  } catch (error) {
    response.status(500);
    throw new Error(error);
  }
};

module.exports = authorize;
