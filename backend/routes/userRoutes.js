const express = require('express')
const router = express.Router()
const authorize = require('../middlewares/authMiddleware')

const {
  registerUser,
  loginUser,
  getUser,
} = require('../controllers/userController.js')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', authorize, getUser)

module.exports = router
