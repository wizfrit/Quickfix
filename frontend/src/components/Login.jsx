import React, { useState } from 'react';
import '../Login.css';
import logo from '../images/quickfix_logo.png';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    api.post('/auth/login', { email, password })
      .then((res) => {
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userId', user.id);
        alert('Login successful');
        // Route based on role
        if (user.role === 'admin') {
          navigate('/blogs');
        } else if (user.role === 'client') {
          navigate('/requests-dashboard');
        } else {
          navigate('/freelancer-dashboard');
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || 'Login failed');
      });
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <img src={logo} alt="QuickFix Logo" className="logo" />
        <h2>Login</h2>
      </header>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
