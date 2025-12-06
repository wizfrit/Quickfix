import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';
import logo from '../images/quickfix_logo.png';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    const id = localStorage.getItem('userId');

    // If no token, check localStorage for cached user
    if (!token) {
      if (role && id) {
        setUser({ role, _id: id });
      }
      return;
    }

    // If token exists, fetch fresh profile from backend
    let mounted = true;
    api.get('/auth/profile')
      .then(res => {
        if (mounted) {
          // Save the role to localStorage for persistence
          if (res.data.role) localStorage.setItem('userRole', res.data.role);
          setUser(res.data);
        }
      })
      .catch((err) => {
        console.warn('Profile fetch failed, using localStorage fallback:', err.message);
        // Fallback to localStorage if API call fails
        if (role && id) {
          setUser({ role, _id: id });
        } else {
          setUser(null);
        }
      });

    return () => { mounted = false; };
  }, []);

  // Re-check user state when route changes (e.g., returning from login page)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    const id = localStorage.getItem('userId');

    if (token && role && id) {
      // User is logged in
      setUser({ role, _id: id, token });
    } else if (!token) {
      // User is logged out
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="navbar">
      <img src={logo} alt="QuickFix Logo" className="logo" />
      <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button onClick={() => navigate('/after-login')}>Home</button>
        <button onClick={() => navigate('/search-professionals')}>Search</button>
        <button onClick={() => navigate('/about-us')}>About</button>
        <button onClick={() => navigate('/blogs')}>Blogs</button>
        {!user && (
          <>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/InitialSignup')}>Signup</button>
          </>
        )}
        {user && user.role === 'admin' && (
          <>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

        {user && user.role === 'professional' && (
          <>
            <button onClick={() => navigate('/freelancer-dashboard')}>My Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

        {user && user.role === 'client' && (
          <>
            <button onClick={() => navigate('/requests-dashboard')}>My Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
