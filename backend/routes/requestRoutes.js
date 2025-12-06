const express = require('express');
const { placeRequest, getRequests, getSingleRequest, getAssignedRequests, completeRequest, submitRequestRating } = require('../controllers/requestController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Client places a new service request
router.post('/', protect, placeRequest);

// List requests (role-aware): clients see own, professionals see open requests
// Protected so that authenticated clients get their own requests
router.get('/', protect, getRequests);

// Assigned requests for authenticated professional
router.get('/assigned', protect, getAssignedRequests);

// Submit rating for a request
router.post('/:id/rate', protect, submitRequestRating);

// Mark an assigned request as completed
router.patch('/:id/complete', protect, completeRequest);

// Get details of a single service request
router.get('/:id', protect, getSingleRequest);

module.exports = router;
