const express = require('express');
const router = express.Router();

const { getAllAffirmations } = require('../controllers/affirmationController');

router.get('/', getAllAffirmations);

module.exports = router;
