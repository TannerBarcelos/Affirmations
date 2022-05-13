const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

/**
 * @description Register a user
 * @method POST
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
const registerUser = asyncHandler(async (request, response) => {
  const { name, email, password, age } = request.body;

  // Check if all fields were entered
  if (!name || !email || !password || !age) {
    response.status(400);
    throw new Error('You must enter a name, email, password and your age');
  }

  // If entered, check if this user exists in the DB - if they do, then they need to login NOT register
  const user = await User.findOne({ email });
  if (user) {
    response.status(400);
    throw new Error('User with this email already exists. Please log in.');
  }

  // If they do no exist, then we can start the creation process.
  // Step 1 - Salt password (encryption process)
  const pwdSalt = await bcrypt.genSalt(12);
  // Step 2 - Hash the password using the salt
  const hashedPWD = await bcrypt.hash(password, pwdSalt);
  // Step 3 - Create the user (ensure you pass the hashedPassword for password field - NEVER STORE PLAIN TEXT PASSWORDS IN A DD)
  // and also the JWT to use for authorization
  const newUser = await User.create({
    name,
    email,
    age,
    password: hashedPWD,
  });

  // If this was successfull, respond with success / created and the jwt
  if (newUser) {
    response.status(201);
    response.json({
      message: 'User created!',
      _id: newUser.id, // return as _id since this is the syntax MongoDB uses and once in client, this make it easy to differentiate
      age,
      email,
      token: generateToken(newUser.id),
    });
  }

  response.send('Register user');
});

/**
 * @description Login a user
 * @method POST
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
const loginUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;

  // Check if all fields were entered
  if (!email || !password) {
    response.status(400);
    throw new Error('You must enter an email and password to login');
  }

  // If entered, check if this user exists and compare the entered password to the hashed password if this user exists (hence the logical &&)
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    response.json({
      _id: user.id,
      email: user.email,
      name: user.name,
      token: generateToken(user.id), // return the JWT which is our auth token!
    });
  } else {
    response.status(400);
    throw new Error('Invalid credentials. Please try again or sign up.');
  }

  response.send('Login user');
});

/**
 * @description Get logged in users data - contains userID in JWT so no need to send /:id
 * @method GET
 * @param {*} request - express request object
 * @param {*} response - express response object
 * @access Private
 */
// Pull out user data from request object and return it
// (it exists because in order to access this, the auth middleware we created will decode
// the attached JWT in the Bearer auth header and pull out the encoded user ID we used when generating the JWT payload. Given it passes
// we do a DB query via the ID and find the user attached. Once found, we get all that users data and attach it to an object called
// 'user' [self named / created] and it is accessible easily like plain JS in this route. Super cool!)
const getUser = asyncHandler(async (request, response) => {
  response.status(200);
  response.json(request.user);
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
