import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../AboutUs.css';
import aboutBanner from '../images/aboutus.png';
import logo from '../images/quickfix_logo.png'; // Make sure this path is correct

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Navbar is now global (NavBar component) */}

      {/* Banner Image */}
      <div className="about-banner">
        <img src={aboutBanner} alt="About Us Banner" className="banner-img" />
      </div>

      {/* Main Content */}
      <div className="about-container">
        <h2 className="about-heading">About Us</h2>

        <section className="about-section">
          <h3 className="about-subheading">Who We Are</h3>
          <p>
            Welcome to Skill Connect, your go-to marketplace for on-demand professional services. We are a team of passionate innovators dedicated to simplifying the way people find and hire skilled professionals. Whether you need an electrician, plumber, mechanic, or any other expert, Skill Connect ensures a seamless, transparent, and efficient experience for both users and service providers.
          </p>
        </section>

        <section className="about-section">
          <h3 className="about-subheading">Our Mission</h3>
          <p>
            At Skill Connect, our mission is to bridge the gap between skilled professionals and customers by providing a reliable, secure, and user-friendly platform. We believe in quality service, fair pricing, and customer satisfaction, ensuring that users can easily connect with experienced professionals while allowing service providers to showcase their skills and grow their businesses.
          </p>
        </section>

        <section className="about-section">
          <h3 className="about-subheading">What We Offer</h3>
          <div className="boock1">
            <ul>
              <li>Seamless Service Requests – Easily post a service request and receive bids from qualified professionals.</li>
              <li>Verified Professionals – Connect with trusted experts based on ratings, experience, and user reviews.</li>
              <li>AI-Powered Assistance – Get smart recommendations to find the right service.</li>
              <li>Cost Transparency & Negotiation – Compare bids, negotiate prices, and make informed decisions.</li>
              <li>Secure Transactions & Communication – Chat directly with professionals and finalize your service hassle-free.</li>
            </ul>
          </div>
        </section>
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

export default AboutUs;
