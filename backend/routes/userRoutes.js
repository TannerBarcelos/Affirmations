const express = require('express');
const router = express.Router();
const protectRoute = require('../middlewares/authMiddleware');

const {
  registerUser,
  loginUser,
  getUser,
} = require('../controllers/userController.js');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protectRoute, getUser);

module.exports = router;
