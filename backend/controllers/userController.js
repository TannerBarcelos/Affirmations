const User = require('../models/userModel')
const generateToken = require('../config/generateToken')

/**
 * @description Register a user
 * @method POST
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
const registerUser = async (request, response) => {
  const { name, email, password, age } = request.body
  if (!name || !email || !password || !age) {
    response.status(400)
    throw new Error('You must enter a name, email, password and your age')
  }

  try {
    // If so, register the user (checks if they exists or not)
    const user = await User.register(name, email, password, age)

    if (user) {
      response.status(201)
      response.json({
        _id: user.id,
        age,
        email,
        token: generateToken(user.id),
      })
    } else {
      response.status(400)
      throw new Error('There was a problem signing up.')
    }
  } catch (error) {
    response.status(500)
    throw new Error(error)
  }
}

/**
 * @description Login a user
 * @method POST
 * @param {*} request - express request object
 * @param {*} response - express response object
 */
const loginUser = async (request, response) => {
  const { email, password } = request.body

  if (!email || !password) {
    response.status(400)
    throw new Error('You must enter an email and password to login')
  }

  try {
    // Try logging in the user with the custom static method
    const user = await User.login(email, password)

    if (user) {
      response.json({
        _id: user.id,
        email: user.email,
        name: user.name,
        token: generateToken(user.id),
      })
    } else {
      response.status(400)
      throw new Error('Invalid credentials. Please try again or sign up.')
    }
  } catch (error) {
    response.status(500)
    throw new Error(error)
  }
}

/**
 * @description Get logged in users data - contains userID in JWT so no need to send /:id
 * @method GET
 * @param {*} request - express request object
 * @param {*} response - express response object
 * @access Private
 */
const getUser = async (request, response) => {
  response.status(200)
  response.json(request.user)
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
}
