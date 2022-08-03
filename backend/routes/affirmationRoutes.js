const express = require('express')
const router = express.Router()

const authorize = require('../middlewares/authMiddleware')

const {
  getAllAffirmations,
  getSingleAffirmation,
  createAffirmation,
  updateAffirmation,
  deleteAffirmation,
} = require('../controllers/affirmationController')

router.get('/getAll', authorize, getAllAffirmations)
router.get('/getOne/:id', authorize, getSingleAffirmation)
router.post('/create', authorize, createAffirmation)
router.put('/edit/:id', authorize, updateAffirmation)
router.delete('/delete/:id', authorize, deleteAffirmation)

module.exports = router
