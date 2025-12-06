import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../Term.css';  // Assuming you have the styles in the corresponding CSS file
import logo from '../images/quickfix_logo.png'; // Ensure the logo image is imported correctly

const Terms = () => {
  const navigate = useNavigate(); // Declare the navigate function
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

      {/* Section Title */}
      <section className="terms-section">
        <h2>Terms & Conditions</h2>
      </section>

      {/* Main Content */}
      <section className="terms-content">
        <p>By using Quick Fix, you agree to the following terms and conditions:</p>
        <p>
          Our platform serves as a marketplace connecting users with skilled professionals for various services, including home maintenance, repairs, and other specialized tasks.
          Users are responsible for providing accurate service requests, while professionals must ensure they offer legitimate and high-quality services.
        </p>
        <p>
          Quick Fix acts as a facilitator and does not guarantee the quality of services rendered by professionals.
          Payments, negotiations, and service agreements are solely between the user and the service provider, and we are not liable for any disputes arising from transactions.
        </p>
        <p>
          Users must adhere to fair usage policies, avoid fraudulent activity, and respect all applicable laws.
          Violation of these terms may result in account suspension or termination. By continuing to use Quick Fix, you acknowledge that you have read, understood, and agreed to these terms.
        </p>
        <p>
          For detailed policies, please refer to our <a href="/privacy-policy">Privacy Policy</a> or contact us at
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

export default Terms;
