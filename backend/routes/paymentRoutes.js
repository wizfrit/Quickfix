const express = require('express');
const { postPayment, getPaymentByRequest } = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Post a payment (after job done)
router.post('/', protect, postPayment);

// Get payment details for a specific request
router.get('/:requestId', protect, getPaymentByRequest);

module.exports = router;
