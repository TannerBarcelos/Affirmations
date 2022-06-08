const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protectRoute = asyncHandler(async (request, response, next) => {
  let token;
  const authHeader = request.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      const foundUser = await User.findById(id).select('-password');
      if (foundUser) {
        request.user = foundUser;
      }
      next();
    } catch (error) {
      console.log(error);
      response.status(401);
      throw new Error('User not authorized');
    }
  }
  if (!token) {
    response.status(401);
    throw new Error('Not authorized - no provided auth token');
  }
});

module.exports = protectRoute;
