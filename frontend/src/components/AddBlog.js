import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/AddBlog.css';

const AddBlog = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        contentType: 'text',
        videoUrl: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        // Check if user is admin
        const userRole = localStorage.getItem('userRole');
        const userId = localStorage.getItem('userId');
        
        if (!userRole || userRole !== 'admin') {
            navigate('/');
            return;
        }

        setUser({ role: userRole, _id: userId });
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            // Validate form
            if (!formData.title.trim()) {
                setError('Title is required');
                setLoading(false);
                return;
            }

            if (!formData.content.trim()) {
                setError('Content is required');
                setLoading(false);
                return;
            }

            if (formData.contentType === 'video' && !formData.videoUrl.trim()) {
                setError('Video URL is required for video content');
                setLoading(false);
                return;
            }

            // Check if video URL is a valid YouTube/embed URL
            if (formData.contentType === 'video') {
                const youtubeUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
                const embedUrlPattern = /^https?:\/\/.+/;
                if (!youtubeUrlPattern.test(formData.videoUrl) && !embedUrlPattern.test(formData.videoUrl)) {
                    setError('Please enter a valid video URL');
                    setLoading(false);
                    return;
                }
            }

            const token = localStorage.getItem('token');
            const response = await api.post('/blogs', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setSuccessMessage('Blog created successfully!');
            setFormData({
                title: '',
                content: '',
                contentType: 'text',
                videoUrl: ''
            });

            // Redirect to blogs page after 2 seconds
            setTimeout(() => {
                navigate('/blogs');
            }, 2000);
        } catch (err) {
            console.error('Error creating blog:', err);
            setError(err.response?.data?.message || 'Failed to create blog. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="add-blog-page">
            <div className="add-blog-container">
                <h1>Create New Blog</h1>

                {error && <div className="error-message">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}

                <form onSubmit={handleSubmit} className="blog-form">
                    <div className="form-group">
                        <label htmlFor="title">Blog Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter blog title"
                            maxLength="200"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contentType">Content Type *</label>
                        <select
                            id="contentType"
                            name="contentType"
                            value={formData.contentType}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="text">Text</option>
                            <option value="video">Video</option>
                        </select>
                    </div>

                    {formData.contentType === 'text' ? (
                        <div className="form-group">
                            <label htmlFor="content">Blog Content *</label>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                placeholder="Enter your blog content here..."
                                rows="12"
                                required
                            ></textarea>
                        </div>
                    ) : (
                        <>
                            <div className="form-group">
                                <label htmlFor="videoUrl">Video URL *</label>
                                <input
                                    type="url"
                                    id="videoUrl"
                                    name="videoUrl"
                                    value={formData.videoUrl}
                                    onChange={handleInputChange}
                                    placeholder="Enter video URL (YouTube or embed URL)"
                                    required
                                />
                                <small>Supports YouTube links and embed URLs</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="content">Video Description *</label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    placeholder="Enter video description..."
                                    rows="6"
                                    required
                                ></textarea>
                            </div>
                        </>
                    )}

                    <div className="form-actions">
                        <button 
                            type="submit" 
                            className="submit-btn"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Blog'}
                        </button>
                        <button 
                            type="button" 
                            className="cancel-btn"
                            onClick={() => navigate('/blogs')}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            {/* Footer */}
            <footer className="footer">
                <p><strong>Stay Connected</strong></p>
                <ul>
                    <li>📍 Location: 353-H Sector-Y DHA Lahore</li>
                    <li>📞 Contact Us: +92 333 4445556</li>
                    <li>📧 Email: quick_fix@gmail.com</li>
                </ul>
                <div className="quick-links">
                    <button onClick={() => navigate('/')}>Home</button>
                    <button onClick={() => navigate('/services')}>Services</button>
                    <button onClick={() => navigate('/about-us')}>About Us</button>
                    <button onClick={() => navigate('/contact-us')}>Contact Us</button>
                    <button onClick={() => navigate('/privacy-policy')}>Privacy Policy</button>
                    <button onClick={() => navigate('/terms')}>Terms & Conditions</button>
                </div>
            </footer>
        </div>
    );
};

export default AddBlog;
