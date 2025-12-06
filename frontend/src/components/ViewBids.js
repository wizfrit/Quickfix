import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from '../api';
import "../ViewBids.css";
import logo from "../images/quickfix_logo.png";

function ViewBids() {

  const navigate = useNavigate();
  const { requestId } = useParams();
  const [quotes, setQuotes] = useState([]);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [acceptedQuoteId, setAcceptedQuoteId] = useState(null);

  useEffect(() => {
    if (!requestId) {
      setError('Request ID not found');
      setLoading(false);
      return;
    }
    // Fetch quotes for this request
    api.get(`/quotes/${requestId}`)
      .then((res) => {
        setQuotes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch quotes:', err);
        setError(err.response?.data?.message || 'Failed to fetch quotes');
        setLoading(false);
      });
  }, [requestId]);

  useEffect(() => {
    if (!requestId) return;
    api.get(`/requests/${requestId}`)
      .then((res) => setRequest(res.data))
      .catch((err) => console.error('Failed to fetch request:', err));
  }, [requestId]);

  const handleAccept = (quoteId) => {
    if (!window.confirm('Accept this quote? This will assign the job to the professional.')) return;
    // Call backend to accept the quote (will update request and other quotes)
    api.patch(`/quotes/${quoteId}/accept`)
      .then((res) => {
        // refresh quotes for this request to show updated statuses
        return Promise.all([api.get(`/quotes/${requestId}`), api.get(`/requests/${requestId}`)]);
      })
      .then(([quotesRes, requestRes]) => {
        setQuotes(quotesRes.data);
        const accepted = quotesRes.data.find(q => q.status === 'accepted');
        setAcceptedQuoteId(accepted?._id || null);
        setRequest(requestRes.data);
        alert('Quote accepted! The professional has been assigned and request updated.');
      })
      .catch((err) => {
        console.error('Failed to accept quote:', err);
        alert(err.response?.data?.message || 'Failed to accept quote');
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const profile = () => {
    navigate('/requests-dashboard');
  };

  return (
    <div className="homepage">
    {/* Navbar is now global (NavBar component) */}


      {/* Back Button */}
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate("/requests-dashboard")}>&lt;Back
        </button>
      </div>

      {/* Bids Section */}
<div className="bids-section1">
  <div className="bids-container1">
    <div className="bids-grid-wrapper">
      <h2>Available Bids for Request</h2>

      {loading && <p>Loading quotes...</p>}
      {error && <p className="error-text">Error: {error}</p>}
      {!loading && quotes.length === 0 && (
        <p>No quotes submitted yet for this request.</p>
      )}

      {!loading && quotes.length > 0 && (
        <>
          <div className="bids-header1">
            <span>Quote #</span>
            <span>Professional</span>
            <span>Amount</span>
            <span>ETA</span>
            <span>Action</span>
          </div>

          {(() => {
            // Ensure numeric comparison and show lowest price on top (ascending)
            const sorted = quotes.slice().sort((a, b) => {
              const aAmt = Number(a.proposedAmount) || 0;
              const bAmt = Number(b.proposedAmount) || 0;
              return aAmt - bAmt; // ascending: lowest first
            });
            return sorted.map((quote, index) => (
              <div className="bids-row1" key={quote._id}>
                <span>Quote #{index + 1}</span>
                <span>{quote.professional?.name || "Professional"}</span>
                <span>Rs. {quote.proposedAmount}</span>
                <span>{quote.estimatedTime || "N/A"}</span>

                <div className="action-cell1">
                  {acceptedQuoteId === quote._id ? (
                    <span className="accepted-text">Accepted</span>
                  ) : (
                    <button
                      className="accept-button1"
                      onClick={() => handleAccept(quote._id)}
                    >
                      Accept
                    </button>
                  )}
                </div>
              </div>
            ));
          })()}
        </>
      )}
    </div>
  </div>
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

export default ViewBids;
