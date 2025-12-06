import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import '../ViewClientDetails.css';
import logo from '../images/quickfix_logo.png';

export default function ViewClientDetailsClean() {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const [request, setRequest] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proposedAmount, setProposedAmount] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');

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

  const handleSubmitQuote = (e) => {
    e.preventDefault();
    if (!proposedAmount) return alert('Please enter proposed amount');
    const payload = {
      serviceRequest: requestId,
      proposedAmount: Number(proposedAmount),
      estimatedTime,
    };
    api.post('/quotes', payload)
      .then(() => api.get(`/quotes/${requestId}`))
      .then((res) => setQuotes(res.data))
      .catch((err) => {
        console.error('Failed to submit quote:', err);
        alert(err.response?.data?.message || 'Failed to submit quote');
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const goBack = () => navigate('/freelancer-dashboard');

  return (
    <div className="homepage">
      {/* Navbar is now global (NavBar component) */}

      <div className="back-button-container">
        <button onClick={goBack} className="back-button">&lt;Back</button>
      </div>

      <div className="details-container">
        <h2 className="section-title">Request Details</h2>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {request && (
          <div className="detail-card">
            <div className="detail-item">
              <span className="detail-label">Client ID:</span>
              <span className="detail-value">{request.client}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Required Service:</span>
              <span className="detail-value">{request.serviceType}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Description:</span>
              <span className="detail-value">{request.description}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Location:</span>
              <span className="detail-value">{request.location}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Budget:</span>
              <span className="detail-value">{request.budget}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Urgency:</span>
              <span className="detail-value">{request.urgencyLevel || 'normal'}</span>
            </div>
          </div>
        )}

<section style={{ marginTop: 20 }}>
  <h3 style={{ marginBottom: 12 }}>Quotes</h3>

  {quotes.length === 0 && (
    <p>No quotes yet for this request.</p>
  )}

  <div style={styles.grid}>
    {quotes.map((q) => (
      <article key={q._id} style={styles.card}>
        
        <div style={styles.row}>
          <span style={styles.label}>Professional:</span>
          <span>{q.professional?.name || q.professional}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Amount:</span>
          <span>Rs. {q.proposedAmount}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>ETA:</span>
          <span>{q.estimatedTime || 'N/A'}</span>
        </div>

        <div style={styles.row}>
          <span style={styles.label}>Status:</span>
          <span>{q.status}</span>
        </div>

      </article>
    ))}
  </div>
</section>



        {userRole === 'professional' && (
          <section style={{ marginTop: '20px' }}>
            <section class="quote-section">
  <h3 class="section-title">Submit Your Quote</h3>

  <form class="quote-form" onSubmit={handleSubmitQuote}>
    
    <div class="form-row">
      <label for="amount">Proposed Amount (Rs.)</label>
      <input 
        id="amount"
        type="number" 
        value={proposedAmount} 
        onChange={(e) => setProposedAmount(e.target.value)} 
        required
      />
    </div>

    <div class="form-row">
      <label for="time">Estimated Time</label>
      <input 
        id="time"
        type="text" 
        value={estimatedTime} 
        onChange={(e) => setEstimatedTime(e.target.value)} 
      />
    </div>

    <div class="form-actions">
      <button type="submit">Submit Quote</button>
    </div>

  </form>
</section>

          </section>
        )}
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
const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "16px"
  },

  card: {
    background: "#faf7f2",   // cream
    padding: "16px",
    border: "1px solid #e0ded9",
    borderRadius: "10px",
    display: "grid",
    gap: "8px"
  },

  row: {
    display: "flex",
    justifyContent: "space-between"
  },

  label: {
    fontWeight: 600
  }
};

