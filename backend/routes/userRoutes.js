const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');

const {
  registerUser,
  loginUser,
  getUser,
} = require('../controllers/userController.js');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUser); // <- authorized route - it is protected by the auth middleware that checks for token

module.exports = router;
