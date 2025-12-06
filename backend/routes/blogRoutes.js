const express = require('express');
const { getAllBlogs, createBlog, deleteBlog, updateBlog } = require('../controllers/blogController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getAllBlogs);

// Admin-only routes
router.post('/', protect, createBlog);
router.delete('/:blogId', protect, deleteBlog);
router.put('/:blogId', protect, updateBlog);

module.exports = router;
