const express = require('express');
const { createQuote, getQuotesForRequest } = require('../controllers/quoteController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Professional creates a quote for a service request
router.post('/', protect, createQuote);

// Get all quotes for a specific service request
router.get('/:requestId', protect, getQuotesForRequest);

module.exports = router;
