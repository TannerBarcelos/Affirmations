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

  if (!name || !email || !password || !age) {
    response.status(400);
    throw new Error('You must enter a name, email, password and your age');
  }

  const user = await User.findOne({ email });
  if (user) {
    response.status(400);
    throw new Error('User with this email already exists. Please log in.');
  }

  const pwdSalt = await bcrypt.genSalt(12);
  const hashedPWD = await bcrypt.hash(password, pwdSalt);

  const newUser = await User.create({
    name,
    email,
    age,
    password: hashedPWD,
  });

  if (newUser) {
    response.status(201);
    response.json({
      _id: newUser.id,
      age,
      email,
      token: generateToken(newUser.id),
    });
  }
});

/**
 * @description Login a user
 * @method POST
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
const loginUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    response.status(400);
    throw new Error('You must enter an email and password to login');
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    response.json({
      _id: user.id,
      email: user.email,
      name: user.name,
      token: generateToken(user.id),
    });
  } else {
    response.status(400);
    throw new Error('Invalid credentials. Please try again or sign up.');
  }
});

/**
 * @description Get logged in users data - contains userID in JWT so no need to send /:id
 * @method GET
 * @param {*} request - express request object
 * @param {*} response - express response object
 * @access Private
 */
const getUser = asyncHandler(async (request, response) => {
  response.status(200);
  response.json(request.user);
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
