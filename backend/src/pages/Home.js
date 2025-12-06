// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h2>Your Wish, Their Skill!</h2>
      <button onClick={() => navigate("/request")}>Place a Request</button>
    </div>
  );
}

export default Home;
