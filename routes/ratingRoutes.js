const express = require('express');
const { submitRating, getRatingsForProfessional } = require('../controllers/ratingController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Client submits a rating for a professional
router.post('/', protect, submitRating);

// Get all ratings for a specific professional
router.get('/:professionalId', getRatingsForProfessional);

module.exports = router;
