import React from 'react';
import '../HomePage.css';
import { useNavigate } from 'react-router-dom';

import logo from '../images/quickfix_logo.png';
import avail from '../images/avail.png';
import pricing from '../images/pricing.png';
import expert from '../images/expert.png';
import support from '../images/support.png';

import acRepair from '../images/ac_repair.webp';
import carWash from '../images/car_wash.webp';
import carpenter from '../images/carpenter.webp';
import electrician from '../images/electrician.webp';
import fridge from '../images/fridge_repair.webp';
import entUnit from '../images/ent_unit_setup.webp';
import painter from '../images/painter.webp';
import plumber from '../images/plumber.webp';

const HomePage = () => {
  const navigate = useNavigate();

 

  return (
    <div className="homepage">
      {/* Navbar is now global (NavBar component) */}

     

      {/* Intro Section */}
      <section className="intro">
        <h2>
          Bringing customers and technicians together
          <br />
          for fast, secure, and budget-friendly service bookings.
        </h2>
      
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Services We Offer</h2>
        <div className="service-grid-custom">
          {/* service items */}
          {[{ img: acRepair, label: 'AC Repair' },
            { img: carWash, label: 'Car Wash' },
            { img: carpenter, label: 'Carpenter' },
            { img: electrician, label: 'Electrician' },
            { img: fridge, label: 'Fridge Repair' },
            { img: entUnit, label: 'Entertainment Unit Setup' },
            { img: painter, label: 'Painter' },
            { img: plumber, label: 'Plumber' }].map((service, i) => (
            <div className="service-item" key={i}>
              <img src={service.img} alt={service.label} />
              <p>{service.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: '100px' }}></div>

      {/* Why Section */}
      <section className="why-section">
        <div className="why-container">
          <div className="features-left">
            <div className="feature-box"><img src={avail} alt="Availability" /></div>
            <div className="feature-box"><img src={pricing} alt="Pricing" /></div>
            <div className="feature-box"><img src={expert} alt="Experts" /></div>
            <div className="feature-box"><img src={support} alt="Support" /></div>
          </div>
          <div className="why-text">
            <h2>Why Quick Fix is Your Most Reliable Choice?</h2>
            <p>
              We understand your concerns about letting a service provider into your home.
              You need professionals you can trust with your space, belongings, and family's safety.
              That’s why Quick Fix offers vetted, reliable, and highly skilled experts—ensuring a
              hassle-free and secure experience every time.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews">
        <h2>Customer Reviews</h2>
        <h4>See what our customers have to say about us.</h4>
        <div className="review-grid">
          <div><strong>Zara Abid:</strong> Extremely impressed... completed efficiently. Thank you!</div>
          <div><strong>Ali Patrick:</strong> Mr. Mahad did an outstanding job!</div>
          <div><strong>Zain Khalid:</strong> Quick and efficient! The booking process was smooth...</div>
          <div><strong>Mr. Aree:</strong> Arrived late, but job completed properly.</div>
        </div>
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

export default HomePage;
