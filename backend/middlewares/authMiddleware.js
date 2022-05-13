const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

/**
 * Authorization function to protect routes from being exposed unless you are logged in (the incoming requests
 * contain Bearer auth header in it)
 *
 * We ensure that an auth header exists and that it is a bearer token and if so, we verify (decode) the data from this token
 * using our secret key and the token in the auth header. They should resolve and give us the signed data we encoded when registering
 * or signing up (authentication). Remember - in our case, we encoded the user ID to make the JWT light and easy to use once decoded
 * like we see below, to run a query with a built in ODM function from mongoose using findById().
 *
 * If this user ID returns a user from the database, that means the user exists and the auth token was valid, so the route that is protected
 * via this middleware will be accessible. Note on line 30 we attach a new property to the request object called "user" and assign it the data
 * of the found user via the query using the decoded ID. This is important because we can then use this ID, other data (name, email, age) in our apps case
 * in any protected level routes and use it in DB queries that might rely on such authorized data.
 *
 * This is common practice and a very useful and needed function in any node app
 */
const protect = asyncHandler(async (request, response, next) => {
  let token;
  const authHeader = request.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      // Get the token since we see it exists
      token = authHeader.split(' ')[1]; // ['Bearer', 'jibberish_id']
      // Verify it with JWT verify method to decode
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      // Get user via the decoded token which of course, contains the user ID as we decided in the generateToken logic (ignore the password)
      const foundUser = await User.findById(id).select('-password');
      // If found, attach the user data to the request object so we then have access to it in the route this middleware wraps
      if (foundUser) {
        request.user = foundUser;
      }
      next();
    } catch (error) {
      console.log(error);
      response.status(401); //un-authorized
      throw new Error('User not authorized');
    }
  }
  if (!token) {
    response.status(401);
    throw new Error('Not authorized - no provided auth token');
  }
});

module.exports = protect;
