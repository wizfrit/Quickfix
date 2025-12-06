import React from "react";
import { useNavigate } from "react-router-dom";
import "../InitialSignup.css";
import logo from '../images/quickfix_logo.png';

const InitialSignup = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <header className="signup-header">
        <img src={logo} alt="QuickFix Logo" className="logo" />
      </header>
      <div className="signup-card">
        <h2 className="signup-title">Sign up</h2>
        <p className="signup-text">Would you like to sign up as a User or a Professional?</p>
        <div className="button-group">
          <button onClick={() => navigate("/user-signup")} className="signup-button">
            User
          </button>
          <button onClick={() => navigate("/prof-signup")} className="signup-button">
            Professional
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitialSignup;
