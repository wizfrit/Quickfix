const Blog = require('../models/Blog');
const User = require('../models/User');

// Get all blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate('author', 'name email')
            .sort({ createdAt: -1 });
        
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs', error: error.message });
    }
};

// Create a new blog (admin only)
const createBlog = async (req, res) => {
    try {
        // Check if user is admin
        const user = await User.findById(req.user.id);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admin can create blogs' });
        }

        const { title, content, contentType, videoUrl } = req.body;

        // Validate input
        if (!title || !content || !contentType) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        if (!['text', 'video'].includes(contentType)) {
            return res.status(400).json({ message: 'Content type must be either "text" or "video"' });
        }

        if (contentType === 'video' && !videoUrl) {
            return res.status(400).json({ message: 'Video URL is required for video content' });
        }

        const blog = await Blog.create({
            title,
            content,
            contentType,
            videoUrl: contentType === 'video' ? videoUrl : null,
            author: req.user.id
        });

        await blog.populate('author', 'name email');

        res.status(201).json({
            message: 'Blog created successfully',
            blog
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating blog', error: error.message });
    }
};

// Delete a blog (admin only)
const deleteBlog = async (req, res) => {
    try {
        // Check if user is admin
        const user = await User.findById(req.user.id);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admin can delete blogs' });
        }

        const { blogId } = req.params;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        await Blog.findByIdAndDelete(blogId);

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blog', error: error.message });
    }
};

// Update a blog (admin only)
const updateBlog = async (req, res) => {
    try {
        // Check if user is admin
        const user = await User.findById(req.user.id);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admin can update blogs' });
        }

        const { blogId } = req.params;
        const { title, content, contentType, videoUrl } = req.body;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (title) blog.title = title;
        if (content) blog.content = content;
        if (contentType) {
            if (!['text', 'video'].includes(contentType)) {
                return res.status(400).json({ message: 'Content type must be either "text" or "video"' });
            }
            blog.contentType = contentType;
        }
        if (videoUrl) blog.videoUrl = videoUrl;
        blog.updatedAt = Date.now();

        await blog.save();
        await blog.populate('author', 'name email');

        res.status(200).json({
            message: 'Blog updated successfully',
            blog
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating blog', error: error.message });
    }
};

module.exports = {
    getAllBlogs,
    createBlog,
    deleteBlog,
    updateBlog
};
