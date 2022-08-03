const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authorize = async (request, response, next) => {
  let apiToken
  const authHeader = request.headers.authorization
  try {
    if (authHeader && authHeader.startsWith('Bearer')) {
      try {
        apiToken = authHeader.split(' ')[1]
        const { id } = jwt.verify(apiToken, process.env.JWT_SECRET)
        const foundUser = await User.findById(id).select('-password')
        if (foundUser) request.user = foundUser
        next()
      } catch (error) {
        console.log(error)
        response.status(401)
        throw new Error('User not authorized')
      }
    }
    if (!apiToken) {
      response.status(401)
      throw new Error('Not authorized - no API Token')
    }
  } catch (error) {
    response.status(500)
    throw new Error(error)
  }
}

module.exports = authorize
