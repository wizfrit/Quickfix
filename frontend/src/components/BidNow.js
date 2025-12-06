import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../BidNow.css";
import logo from "../images/quickfix_logo.png";

function PlaceBid() {
  const navigate = useNavigate();
  const { requestId } = useParams();  // Get the requestId from the URL
  const [bidAmount, setBidAmount] = useState("");

  // Get the professionalId (logged-in user's ID) from localStorage (or state management)
  const user = JSON.parse(localStorage.getItem('user'));  // Assuming user data is stored in localStorage
  const professionalId = user ? user.id : null;  // Access the logged-in professional's ID

  const handleBidSubmit = async () => {
    if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    if (!professionalId) {
      alert("You must be logged in to place a bid.");
      return;
    }

    const message = "Sample bid message";  // You can replace this with a custom message from the user

    try {
      // Make a POST request to the backend to place the bid
      const response = await axios.post('http://localhost:3000/bids', {
        request: requestId,  // Dynamically passed requestId
        professional: professionalId,  // Dynamically passed professionalId
        amount: bidAmount,
        message: message
      });

      console.log("Bid placed successfully:", response.data);
      alert("Bid placed successfully!");

      // Redirect to the freelancer dashboard after placing the bid
      navigate("/freelancer-dashboard");
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("Failed to place bid. Please try again.");
    }
  };

  const handleLogout = () => {
    // Optionally clear session/localStorage here
    navigate('/');
  };

  const profile = () => {
    // Optionally clear session/localStorage here
    navigate('/freelancer-dashboard');
  };

  return (
    <div className="homepage">
      {/* Navbar is now global (NavBar component) */}

      {/* Back Button */}
      <div className="back-button-container">
        <button
          onClick={() => navigate("/freelancer-dashboard")}
          className="back-button"
        >
          Back
        </button>
      </div>

      {/* Bid Form Section */}
      <div className="bid-container">
        <h2 className="section-title">Place Your Bid</h2>

        <div className="bid-card">
          <div className="bid-item">
            <span className="bid-label">Current Highest Bid:</span>
            <span className="bid-value">Rs. 2,000</span>
          </div>

          <div className="bid-item">
            <span className="bid-label">Your Bid:</span>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter your bid amount"
              min="1"
            />
          </div>
        </div>

        <button className="done-btn"onClick={profile}> Submit Bid
        </button>
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

export default PlaceBid;
