const express = require('express');
const router = express.Router();

const protectRoute = require('../middlewares/authMiddleware');

const {
  getAllAffirmations,
  getSingleAffirmation,
  createAffirmation,
  updateAffirmation,
  deleteAffirmation,
} = require('../controllers/affirmationController');

router.get('/getAll', protectRoute, getAllAffirmations);
router.get('/getOne/:id', protectRoute, getSingleAffirmation);
router.post('/create', protectRoute, createAffirmation);
router.put('/edit/:id', protectRoute, updateAffirmation);
router.delete('/delete/:id', protectRoute, deleteAffirmation);

module.exports = router;
