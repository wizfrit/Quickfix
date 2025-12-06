import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../ProfSignup.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [field, setField] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send skills as array for proper backend processing
    const payload = { 
      name, 
      email, 
      password, 
      phoneNumber,
      role: 'professional', 
      skills: field ? [field] : [] 
    };
    api.post('/auth/register', payload)
      .then(() => {
        alert('Professional signup successful! Please login.');
        navigate('/login-p');
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || 'Signup failed');
      });
  };

  return (
    <div className="signup-container">
      <header className="header">
        <div className="logo-text">
          <span className="logo-title">QUICKFIX</span>
          <span className="logo-sub">your instant solution</span>
        </div>
        <div className="logo-icon">🔧🔨</div>
      </header>

      <div className="signup-box">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)} required />

          <label>Email:</label>
          <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required />

          <label>Phone Number:</label>
          <input type="tel" placeholder="Enter your phone number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} required />

          <label>Password:</label>
          <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} required />

          <label>Field/Skill:</label>
          <input type="text" placeholder="Enter your skillset" value={field} onChange={(e)=>setField(e.target.value)} required />

          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
