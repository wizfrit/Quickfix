const express = require('express');
const { getAllServices, addService } = require('../controllers/serviceController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Get all available services (e.g., plumbing, electrician etc.)
router.get('/', getAllServices);

// Admin or professional adds a new service (optional)
router.post('/', protect, addService);

module.exports = router;
