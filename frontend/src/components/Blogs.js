import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/Blogs.css';

const Blogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get user from localStorage
        const userRole = localStorage.getItem('userRole');
        const userId = localStorage.getItem('userId');
        if (userRole && userId) {
            setUser({ role: userRole, _id: userId });
        }

        // Fetch blogs
        const fetchBlogs = async () => {
            try {
                const response = await api.get('/blogs');
                setBlogs(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching blogs:', err);
                setError('Failed to load blogs');
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleDeleteBlog = async (blogId) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                const token = localStorage.getItem('token');
                await api.delete(`/blogs/${blogId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBlogs(blogs.filter(blog => blog._id !== blogId));
            } catch (err) {
                console.error('Error deleting blog:', err);
                alert('Failed to delete blog');
            }
        }
    };

    if (loading) {
        return <div className="blogs-container"><p>Loading blogs...</p></div>;
    }

    return (
        <div className="blogs-page">
            <div className="blogs-container">
                <div className="blogs-header">
                    <h1>Blogs</h1>
                    {user && user.role === 'admin' && (
                        <button 
                            className="add-blog-btn"
                            onClick={() => navigate('/add-blog')}
                        >
                            + Add Blog
                        </button>
                    )}
                </div>

                {error && <p className="error-message">{error}</p>}

                {blogs.length === 0 ? (
                    <p className="no-blogs">No blogs available yet.</p>
                ) : (
                    <div className="blogs-grid">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="blog-card">
                                <div className="blog-header-section">
                                    <h2>{blog.title}</h2>
                                    {user && user.role === 'admin' && (
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDeleteBlog(blog._id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>

                                {blog.contentType === 'video' ? (
                                    <div className="video-container">
                                        <iframe
                                            width="100%"
                                            height="300"
                                            src={blog.videoUrl}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={blog.title}
                                        ></iframe>
                                    </div>
                                ) : (
                                    <div className="blog-content">
                                        <p>{blog.content}</p>
                                    </div>
                                )}

                                <div className="blog-footer">
                                    <small>By: {blog.author.name}</small>
                                    <small>{new Date(blog.createdAt).toLocaleDateString()}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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

export default Blogs;
