console.log("authRoutes.js loaded");
const express = require('express');
const { registerUser, loginUser, getProfile, searchProfessionals } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/profile', protect, getProfile);

router.get('/search-professionals', searchProfessionals);

module.exports = router;
