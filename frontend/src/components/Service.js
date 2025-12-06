import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../service.css';

import logo from '../images/quickfix_logo.png'; // Ensure the logo image is imported correctly
import homeRepairImg from '../images/homerepaire.png';
import automotiveImg from '../images/automatic.png';
import renovationImg from '../images/improvement.png';
import applianceImg from '../images/application.png';

const services = [
  {
    title: "🔧 Home Maintenance & Repairs",
    points: [
      "Electricians for wiring, lighting, and repairs",
      "Plumbers for leak fixes, installations, and maintenance",
      "Carpenters for furniture repairs and custom work",
      "Painters for home and commercial spaces",
      "Deep cleaning service",
    ],
    image: homeRepairImg,
  },
  {
    title: "🚗 Automotive Services",
    points: [
      "Mechanics for vehicle repairs and maintenance",
      "Car detailing and cleaning services",
      "Tire change, battery replacement, and diagnostics",
    ],
    image: automotiveImg,
  },
  {
    title: "🏡 Home Improvement & Renovation",
    points: [
      "Interior designers for home and office spaces",
      "Flooring and tiling services",
      "HVAC (Heating & Cooling) system installation and repair",
    ],
    image: renovationImg,
  },
  {
    title: "🛠 Appliance Repair & Installation",
    points: [
      "AC and refrigerator repairs",
      "Washing machine and dryer services",
      "TV and home entertainment system setup",
    ],
    image: applianceImg,
  },
];

const Service = () => {
  const navigate = useNavigate(); // Add useNavigate to enable navigation
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
      <div className="service-container">
        <h1 className="services-title">Our Services</h1>
        <p className="services-subtitle">Connecting You with Skilled Professionals</p>
        <p className="services-intro">
          At Skill Connect, we make it easy for you to find reliable professionals for a variety of home and business needs.
          Whether you need quick repairs, installations, or specialized services, we’ve got you covered!
        </p>

        {services.map((service, index) => (
          <div key={index} className="service-block">
            <div className="service-text">
              <h3>{service.title}</h3>
              <ul>
                {service.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="service-image">
              <img src={service.image} alt={service.title} />
            </div>
          </div>
        ))}
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

export default Service;
