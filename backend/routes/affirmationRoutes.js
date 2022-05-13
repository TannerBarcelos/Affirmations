const express = require('express');
const router = express.Router();

const {
  getAllAffirmations,
  getSingleAffirmation,
  createAffirmation,
  updateAffirmation,
  deleteAffirmation,
} = require('../controllers/affirmationController');

router.get('/', getAllAffirmations);
router.get('/:id', getSingleAffirmation);
router.post('/create', createAffirmation);
router.put('/edit/:id', updateAffirmation);
router.delete('/delete/:id', deleteAffirmation);

module.exports = router;
