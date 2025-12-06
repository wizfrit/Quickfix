import React, { useState, useEffect } from 'react';
import '../ApplyNow.css';
import logo from '../images/quickfix_logo.png';
import api from '../api';
import { useParams } from 'react-router-dom';

const ApplyNow = () => {
  const { requestId } = useParams();
  const [proposedAmount, setProposedAmount] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!requestId || !proposedAmount) {
      alert('Please provide all required fields');
      return;
    }
    const payload = {
      serviceRequest: requestId,
      proposedAmount,
      estimatedTime
    };
    api.post('/quotes', payload)
      .then(() => {
        alert('Quote submitted successfully');
        setProposedAmount('');
        setEstimatedTime('');
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || 'Failed to submit quote');
      });
  };

  return (
    <div className="apply-container">
      <header className="apply-header">
        <img src={logo} alt="QuickFix Logo" className="logo" />
        <nav>
          <button>Home</button>
          <button>Search</button>
          <button>About</button>
          <button>Login</button>
          <button>Sign up</button>
        </nav>
      </header>
      <main className="apply-main">
        <h2>Submit Your Quote</h2>
        <p>
          Provide your quote details for the service request
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Proposed Amount (Rs.)"
            value={proposedAmount}
            onChange={(e) => setProposedAmount(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Estimated Time"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
          />
          <button type="submit">Submit Quote</button>
        </form>
      </main>
      <footer className="apply-footer">
      <p><strong>Stay Connected</strong></p>
        <ul>
          <li>📍 Location: 353-H Sector-Y DHA Lahore</li>
          <li>📞 Contact Us: +92 333 4445556</li>
          <li>📧 Email: quick_fix@gmail.com</li>
        </ul>
        <p>
          <strong>Quick Links:</strong> Home | Services | About Us | Contact Us | Privacy Policy | Terms & Conditions
        </p>
      </footer>
    </div>
  );
};

export default ApplyNow;
