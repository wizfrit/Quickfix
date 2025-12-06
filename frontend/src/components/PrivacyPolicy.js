import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/quickfix_logo.png'; // Ensure the logo is imported
import '../PrivacyPolicy.css';  // Assuming you have the styles in the corresponding CSS file

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Optionally clear session/localStorage here
    navigate('/');
  };

  const profile = () => {
    // Optionally clear session/localStorage here
    navigate('/requests-dashboard');
  };
  return (
    <div className="homepage">
      {/* Navbar is now global (NavBar component) */}

      {/* Privacy Section Title */}
      <section className="privacy-section">
        <h2>Privacy Policy</h2>
      </section>

      {/* Privacy Text Content */}
      <section className="privacy-content">
        <p>
          At Quick Fix, we value your privacy and are committed to protecting your personal information.
          When you use our platform, we may collect data such as your name, contact details, location,
          and service preferences to enhance your experience and facilitate smooth interactions between
          users and professionals. We use this information to process service requests, improve our
          platform, and ensure secure transactions. Your data is never sold or shared with third parties
          for marketing purposes, and we implement strong security measures to protect it from unauthorized
          access. By using Quick Fix, you consent to our data collection and usage practices as outlined
          in our full Privacy Policy.
        </p>
        <p>
          If you have any concerns or wish to manage your data, please contact us at
          <a href="mailto:quickfix@gmail.com">quickfix@gmail.com</a>.
        </p>
      </section>

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

export default PrivacyPolicy;
