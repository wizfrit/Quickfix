// src/pages/RequestForm.js
import React, { useState } from "react";
import './RequestForm.css';

function RequestForm() {
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    urgency: "",
    time: "",
    location: "",
    budget: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <div className="request-form">
      <h2>Place a Request</h2>
      <form onSubmit={handleSubmit}>
        <label>Description:
          <input type="text" name="description" onChange={handleChange} />
        </label>
        <label>Category:
          <input type="text" name="category" onChange={handleChange} />
        </label>
        <label>Urgency:
          <input type="text" name="urgency" onChange={handleChange} />
        </label>
        <label>Time:
          <input type="text" name="time" onChange={handleChange} />
        </label>
        <label>Location:
          <input type="text" name="location" onChange={handleChange} />
        </label>
        <label>Budget:
          <input type="text" name="budget" onChange={handleChange} />
        </label>
        <div className="form-buttons">
          <button type="button" onClick={() => setFormData({})}>Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default RequestForm;
