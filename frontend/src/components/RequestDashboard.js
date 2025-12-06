import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api';
import logo from '../images/quickfix_logo.png';
import '../RequestsDashboard.css';

function RequestsDashboard() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [quotes, setQuotes] = useState({});
  const [ratings, setRatings] = useState({});
  const [ratingInputs, setRatingInputs] = useState({});
  const [submitting, setSubmitting] = useState({});
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Fetch requests when component mounts
    api.get('/requests')
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Failed to fetch requests');
        setLoading(false);
      });
  }, []);

  const fetchHistoryData = async () => {
    try {
      const acceptedReqs = requests.filter(req => req.status === 'completed' && String(req.client) === String(userId));
      setAcceptedRequests(acceptedReqs);

      // Build ratings map from request data
      const ratingsMap = {};
      acceptedReqs.forEach(req => {
        if (req.rating) {
          ratingsMap[req._id] = req.rating;
        }
      });
      setRatings(ratingsMap);

      // Fetch quotes for each accepted request
      const quotesMap = {};
      for (const req of acceptedReqs) {
        try {
          const res = await api.get(`/quotes?serviceRequest=${req._id}`);
          if (res.data && res.data.length > 0) {
            quotesMap[req._id] = res.data[0]; // Get first quote
          }
        } catch (err) {
          console.error('Error fetching quotes:', err);
        }
      }
      setQuotes(quotesMap);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  const handleShowHistory = () => {
    setShowHistory(true);
    fetchHistoryData();
  };

  const handleSubmitRating = async (reqId) => {
    const ratingValue = ratingInputs[reqId];
    if (!ratingValue && ratingValue !== 0) {
      alert('Please select a rating');
      return;
    }

    setSubmitting(prev => ({ ...prev, [reqId]: true }));

    try {
      await api.post(`/requests/${reqId}/rate`, {
        requestId: reqId,
        rating: ratingValue
      });
      alert('Rating submitted!');
      // Update ratings state
      setRatings(prev => ({ ...prev, [reqId]: ratingValue }));
      setRatingInputs(prev => ({ ...prev, [reqId]: null }));
    } catch (err) {
      alert('Failed to submit rating');
    }
    setSubmitting(prev => ({ ...prev, [reqId]: false }));
  };

  const handlePlaceRequest = () => {
    navigate('/place-request');
  };

  const handleViewBids = (id) => {
    navigate(`/view-bids/${id}`);
  };

  return (
    <div className="homepage">
      {/* Main Dashboard */}
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Your Wish, Their Skills!</h1>
          <button className="history-btn" onClick={handleShowHistory}>
            History
          </button>
        </div>
        
        <button className="place-request-btn" onClick={handlePlaceRequest}>
          Place a Request +
        </button>

        {!showHistory ? (
          <section className="requests-section">
            <div className="requests-table">
              <h2>Your Requests</h2>
              {loading && <p>Loading requests...</p>}
              {error && <p style={{color: 'red'}}>Error: {error}</p>}
              {!loading && requests.length === 0 && <p>No requests yet. Create one to get started!</p>}
              {!loading && requests.length > 0 && (
                <>
                  <div className="table-row table-header">
                    <span>#</span>
                    <span>Service</span>
                    <span>Location</span>
                    <span>Status</span>
                    <span>Action</span>
                  </div>
                  {requests
                    .filter(req => req.status === 'open')
                    .map((req, index) => (
                      <div className="table-row" key={req._id}>
                        <span>{index + 1}</span>
                        <span>{req.serviceType}</span>
                        <span>{req.location}</span>
                        <span>{req.status || 'open'}</span>
                        <span>
                          <button className="view-bids-btn" onClick={() => handleViewBids(req._id)}>
                            View Bids
                          </button>
                        </span>
                      </div>
                  ))}
                </>
              )}
            </div>
          </section>
        ) : (
          <section className="requests-section">
            <div className="requests-table">
              <div className="history-header">
                <h2>Request History</h2>
                <button className="back-btn" onClick={() => setShowHistory(false)}>← Back</button>
              </div>
              {acceptedRequests.length === 0 && <p>No completed requests in history.</p>}
              {acceptedRequests.length > 0 && (
                <>
                  <div className="table-row table-header">
                    <span>Service</span>
                    <span>Professional</span>
                    <span>Time</span>
                    <span>Rating</span>
                  </div>
                  {acceptedRequests.map((req) => (
                    <div key={req._id}>
                      <div className="table-row">
                        <span>{req.serviceType}</span>
                        <span>{req.professional?.name || 'N/A'}</span>
                        <span>{
                          req.timeSlot ? new Date(req.timeSlot).toLocaleString() : (req.createdAt ? new Date(req.createdAt).toLocaleString() : 'N/A')
                        }</span>
                        <span>
                          {ratings[req._id] ? (
                            <span className="rating-display">⭐ {ratings[req._id]}/5</span>
                          ) : (
                            <div className="rating-inline">
                              <select 
                                value={ratingInputs[req._id] || ''} 
                                onChange={e => setRatingInputs(prev => ({ ...prev, [req._id]: Number(e.target.value) }))}
                              >
                                <option value="">Rate</option>
                                {[1,2,3,4,5].map(v => <option key={v} value={v}>{v} ⭐</option>)}
                              </select>
                              <button 
                                className="rate-btn" 
                                disabled={submitting[req._id]} 
                                onClick={() => handleSubmitRating(req._id)}
                              >
                                {submitting[req._id] ? '...' : 'Submit'}
                              </button>
                            </div>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </section>
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
}

export default RequestsDashboard;
