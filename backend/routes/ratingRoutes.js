const express = require('express');
const { submitRating, getRatingsForProfessional, getAverageRatingFromRequests } = require('../controllers/ratingController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Client submits a rating for a professional
router.post('/', protect, submitRating);

// Get average rating for a specific professional (from Request.rating)
router.get('/average/:professionalId', getAverageRatingFromRequests);

// Get all ratings for a specific professional (legacy Rating model)
router.get('/:professionalId', getRatingsForProfessional);

module.exports = router;
