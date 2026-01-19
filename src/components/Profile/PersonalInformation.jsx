import React, { useState } from "react";
import "./Profile.css";

const PersonalInformation = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-image">
            <img src="https://via.placeholder.com/120" alt="Profile" />
          </div>
          <h2 className="profile-name">Hello Sarah</h2>

          <div className="profile-tabs">
            <button className="tab-btn active">Personal Information</button>
            <button className="tab-btn">Settings</button>
          </div>
        </div>

        <div className="profile-form">
          <div className="form-group">
            <label>
              <i className="icon-user"></i>
              User Name
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>
              <i className="icon-email"></i>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>
              <i className="icon-phone"></i>
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone"
            />
          </div>

          <div className="form-group">
            <label>
              <i className="icon-calendar"></i>
              Date Of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
