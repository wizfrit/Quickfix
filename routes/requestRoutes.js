const express = require('express');
const { placeRequest, getClientRequests, getSingleRequest } = require('../controllers/requestController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Client places a new service request
router.post('/', protect, placeRequest);

// Client views all his/her own requests
router.get('/', protect, getClientRequests);

// Get details of a single service request
router.get('/:id', protect, getSingleRequest);

module.exports = router;
