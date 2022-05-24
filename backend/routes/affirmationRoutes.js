const express = require('express');
const router = express.Router();

const protect = require('../middlewares/authMiddleware');

const {
  getAllAffirmations,
  getSingleAffirmation,
  createAffirmation,
  updateAffirmation,
  deleteAffirmation,
} = require('../controllers/affirmationController');

router.get('/getAll', protect, getAllAffirmations); // protected route via auth middleware and JWT
router.get('/getOne/:id', protect, getSingleAffirmation);
router.post('/create', protect, createAffirmation);
router.put('/edit/:id', protect, updateAffirmation);
router.delete('/delete/:id', protect, deleteAffirmation);

module.exports = router;
