import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../contactUs.css';
import logo from '../images/quickfix_logo.png'; // Make sure this path is correct



const ContactUs = () => {
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


      {/* Contact Information */}
      <div className="contact-us-container">
        <div className="contact-box">
          <h3>Phone Number</h3>
          <p>XXXX-XXXXXXX</p>
        </div>
        <div className="contact-box">
          <h3>Email</h3>
          <p>quickfix@gmail.com</p>
        </div>
        <div className="contact-box">
          <h3>Location</h3>
          <p>Lahore, Pakistan</p>
        </div>
        <div className="contact-box">
          <h3>Working Hours</h3>
          <p>Monday-Saturday<br />9:00 AM to 9:00 PM</p>
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
};

export default ContactUs;
