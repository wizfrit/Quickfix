// Dynamic view-more-details: fetches request and quotes
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import '../ViewMoreDetails.css';
import logo from '../images/quickfix_logo.png';

function MoreDetails() {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const [request, setRequest] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    if (!requestId) {
      setError('Missing request ID');
      setLoading(false);
      return;
    }

    setLoading(true);
    api.get(`/requests/${requestId}`)
      .then((res) => setRequest(res.data))
      .catch((err) => {
        console.error('Failed to fetch request:', err);
        setError(err.response?.data?.message || 'Failed to fetch request');
      });

    api.get(`/quotes/${requestId}`)
      .then((res) => setQuotes(res.data))
      .catch((err) => console.error('Failed to fetch quotes:', err))
      .finally(() => setLoading(false));
  }, [requestId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const goProfile = () => navigate('/requests-dashboard');
  const goBack = () => navigate('/freelancer-dashboard');

  return (
    <div className="homepage">
      {/* Navbar is now global (NavBar component) */}

      <div className="back-button-container">
        <button onClick={goBack} className="back-button">Back</button>
      </div>

      <div className="details-container">
        <h2 className="section-title">More Details</h2>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {request && (
          <div className="detail-card">
            <div className="detail-item">
              <span className="detail-label">Decided Price:</span>
              <span className="detail-value">{request.decidedPrice ? `Rs. ${request.decidedPrice}` : '—'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Required Service:</span>
              <span className="detail-value">{request.serviceType}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Location:</span>
              <span className="detail-value">{request.location}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Client Rating:</span>
              <span className="detail-value">{request.clientRating || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Description:</span>
              <span className="detail-value">{request.description}</span>
            </div>
          </div>
        )}

        <section style={{ marginTop: '20px' }}>
          <h3>Quotes</h3>
          {quotes.length === 0 && !loading && <p>No quotes yet for this request.</p>}
          {quotes.map((q) => (
            <div key={q._id} style={{ border: '1px solid #ddd', padding: '8px', marginBottom: '8px' }}>
              <div><strong>Professional:</strong> {q.professional?.name || q.professional}</div>
              <div><strong>Amount:</strong> Rs. {q.proposedAmount}</div>
              <div><strong>ETA:</strong> {q.estimatedTime || 'N/A'}</div>
              <div><strong>Status:</strong> {q.status}</div>
            </div>
          ))}
        </section>
      </div>

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
}

export default MoreDetails;
