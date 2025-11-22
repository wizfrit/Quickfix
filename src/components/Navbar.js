// src/components/Navbar.js
import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">QUICKFIX</div>
      <div className="icons">
        <input type="text" placeholder="Search" className="search-input" />
        <span className="icon">🔍</span>
        <span className="icon">⚫</span>
      </div>
    </nav>
  );
}

export default Navbar;
