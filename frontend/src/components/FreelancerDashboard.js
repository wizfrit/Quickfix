// src/pages/FreelancerDashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api';
import "../FreelancerDashboard.css";
import logo from "../images/quickfix_logo.png";

function FreelancerDashboard() {
  const jobGridStyle = {
  display: "grid",
  gridTemplateColumns: "100px 1fr 1fr 100px 1.5fr 140px",
  padding: "10px 0",
  alignItems: "center",
  borderBottom: "1px solid #ddd"
};

const headerStyle = {
  ...jobGridStyle,
  fontWeight: "600",
  borderBottom: "2px solid #ccc",
};
const bidsGridStyle = {
  display: "grid",
  gridTemplateColumns: "100px 1fr 1fr 100px 1.5fr 140px",
  padding: "10px 0",
  alignItems: "center",
  borderBottom: "1px solid #ddd"
};

const bidsHeaderStyle = {
  ...bidsGridStyle,
  fontWeight: "600",
  borderBottom: "2px solid #ccc",
};


  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [loadingQuotes, setLoadingQuotes] = useState(true);
  const [errorRequests, setErrorRequests] = useState(null);
  const [errorQuotes, setErrorQuotes] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [showOnlyMatched, setShowOnlyMatched] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    // Fetch professional profile to get their skills/services
    async function loadProfileAndRequests() {
      let skills = [];
      if (userId) {
        try {
          // backend exposes authenticated profile at /api/auth/profile
          const res = await api.get('/auth/profile');
          skills = res.data.skills || [];
        } catch (err) {
          // fallback: try reading skills from localStorage if available
          try {
            const s = localStorage.getItem('skills');
            skills = s ? JSON.parse(s) : [];
          } catch (e) {
            skills = [];
          }
        }
      }
      // normalize helper inside effect will be used below
      const normalize = (text) => (text || '').toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, ' ');
      const normalizedSkills = (skills || []).flatMap((s) => {
        if (!s) return [];
        if (typeof s === 'string') return s.split(',').map(x => normalize(x));
        if (typeof s === 'object') {
          if (s.name) return [normalize(s.name)];
          return [normalize(JSON.stringify(s))];
        }
        return [normalize(String(s))];
      }).map(x => x.trim()).filter(Boolean);
      setUserSkills(normalizedSkills);

      // Fetch all requests and show open ones (no skill matching)
      try {
        const res = await api.get('/requests');
        const all = res.data || [];
        const open = all.filter(r => !r.status || r.status === 'open');
        setAllRequests(open);
        // apply initial view (matched or all)
        if (showOnlyMatched && normalizedSkills.length > 0) {
          const matched = open.filter(r => {
            const svc = normalize(r.serviceType);
            return normalizedSkills.some(sk => sk === svc || sk.includes(svc) || svc.includes(sk) || (sk.endsWith('s') && sk.slice(0, -1) === svc) || (svc.endsWith('s') && svc.slice(0, -1) === sk));
          });
          setRequests(matched);
        } else {
          setRequests(open);
        }
      } catch (err) {
        console.error('Error fetching requests:', err);
        setErrorRequests(err.response?.data?.message || 'Failed to fetch requests');
      } finally {
        setLoadingRequests(false);
      }

      // Fetch quotes (for user's own quotes) and assigned requests (Active Bids)
      try {
        // fetch all quotes and keep only those by this professional (for other uses)
        try {
          const resQ = await api.get('/quotes');
          const allQ = resQ.data || [];
          const myQuotes = allQ.filter(q => {
            if (!q.professional) return false;
            if (typeof q.professional === 'string') return q.professional === userId;
            if (typeof q.professional === 'object') return (q.professional._id === userId) || (q.professional.id === userId) || (q.professional === userId);
            return false;
          });
          setQuotes(myQuotes);
        } catch (err) {
          console.warn('Could not fetch quotes:', err);
          setErrorQuotes(err.response?.data?.message || null);
        }

        // Fetch assigned requests for the authenticated professional
        try {
          const resAssigned = await api.get('/requests/assigned');
          setAcceptedRequests(resAssigned.data || []);
        } catch (err) {
          console.warn('Could not fetch assigned requests:', err);
          setAcceptedRequests([]);
        }
      } finally {
        setLoadingQuotes(false);
      }
    }

    loadProfileAndRequests();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/');
  };

  const handleView = (requestId) => navigate(`/view-client-details/${requestId}`);

  const [completingId, setCompletingId] = useState(null);

  // Handle marking a request as completed by the assigned professional
  const handleComplete = async (requestId) => {
    if (!window.confirm('Mark this request as completed?')) return;
    try {
      setCompletingId(requestId);
      await api.patch(`/requests/${requestId}/complete`);
      // remove from local acceptedRequests list
      setAcceptedRequests(prev => prev.filter(r => r._id !== requestId));
      // show congratulations popup
      window.alert('Congratulations — you have completed the job!');
    } catch (err) {
      console.error('Error completing request:', err);
      window.alert(err.response?.data?.message || 'Failed to mark request as completed');
    } finally {
      setCompletingId(null);
    }
  };

  // normalize helper (component scope)
  const normalize = (text) => (text || '').toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, ' ');

  // toggle matched vs all view
  const setFilterMode = (onlyMatched) => {
    setShowOnlyMatched(onlyMatched);
    if (onlyMatched) {
      const filtered = allRequests.filter(r => {
        const svc = normalize(r.serviceType);
        return userSkills.some(sk => sk === svc || sk.includes(svc) || svc.includes(sk) || (sk.endsWith('s') && sk.slice(0, -1) === svc) || (svc.endsWith('s') && svc.slice(0, -1) === sk));
      });
      setRequests(filtered);
    } else {
      setRequests(allRequests);
    }
  };

  // removed inline offer functions; offering happens in View Client Detail

  return (
    <div className="homepage">
      {/* Navbar is now global (NavBar component) */}
      <h1 className="tagline">Bid Smart, Earn Big!</h1>


      {/* Available Jobs */}
      <div className="jobs-section">
  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <h2>AVAILABLE JOBS</h2>
  </div>

  {loadingRequests && <p>Loading jobs...</p>}
  {errorRequests && <p style={{color: 'red'}}>Error: {errorRequests}</p>}
  {!loadingRequests && requests.length === 0 && <p>No jobs available right now.</p>}

  {!loadingRequests && requests.length > 0 && (
    <>
      {/* HEADER */}
      <div style={headerStyle}>
        <span>Job no.</span>
        <span>Service</span>
        <span>Location</span>
        <span>Urgency</span>
        <span>Details</span>
        <span>Action</span>
      </div>

      {/* DATA ROWS */}
      {requests.map((request, index) => (
        <div style={jobGridStyle} key={request._id}>
          <span>Job #{index + 1}</span>

          <span>
            {typeof request.serviceType === "string"
              ? request.serviceType
              : request.serviceType?.name ||
                request.serviceType?.title ||
                JSON.stringify(request.serviceType)}
          </span>

          <span>{request.location}</span>
          <span>{request.urgencyLevel || "normal"}</span>
          <span>{request.description?.substring(0, 30)}...</span>

          <div style={{display: "flex", gap: "8px"}}>
            <button
              className="view-btn"
              onClick={() => handleView(request._id)}
            >
              View Client Detail
            </button>
          </div>
        </div>
      ))}
    </>
  )}
</div>


{/* Active Bids Section */}
<div className="bids-section">
  <h2>Your Active Bids</h2>

  {loadingQuotes && <p>Loading active bids...</p>}

  {!loadingQuotes && (!acceptedRequests || acceptedRequests.length === 0) && (
    <p>No active bids yet.</p>
  )}

  {!loadingQuotes && acceptedRequests && acceptedRequests.length > 0 && (
    <>
      {/* Header row */}
      <div style={bidsHeaderStyle}>
        <span>Job</span>
        <span>Service</span>
        <span>Location</span>
        <span>Urgency</span>
        <span>Status</span>
        <span>Action</span>
      </div>

      {/* Data rows */}
      {acceptedRequests.map((r, i) => (
        <div style={bidsGridStyle} key={r._id}>
          <span>#{i + 1}</span>
          <span>{r.serviceType}</span>
          <span>{r.location}</span>
          <span>{r.urgencyLevel || "normal"}</span>
          <span>{r.status || "accepted"}</span>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              className="view-btn"
              onClick={() => handleComplete(r._id)}
              disabled={completingId === r._id}
            >
              {completingId === r._id ? "Completing..." : "Complete"}
            </button>
          </div>
        </div>
      ))}
    </>
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
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/services")}>Services</button>
          <button onClick={() => navigate("/about-us")}>About Us</button>
          <button onClick={() => navigate("/contact-us")}>Contact Us</button>
          <button onClick={() => navigate("/privacy-policy")}>Privacy Policy</button>
          <button onClick={() => navigate("/terms")}>Terms & Conditions</button>
        </div>
      </footer>
    </div>
  );
}

export default FreelancerDashboard;

