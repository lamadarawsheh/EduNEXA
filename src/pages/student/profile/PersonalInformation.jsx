import React, { useState } from "react";
import { Calendar, Mail, Phone, User } from "lucide-react";
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
    <div className="profile-section">
      <div className="profile-section-header">
        <h2 className="profile-section-title">Personal information</h2>
        <p className="profile-section-subtitle">Update your name, email, and contact details.</p>
      </div>

      <div className="profile-form">
        <div className="form-group">
          <label>
            <User className="profile-icon" aria-hidden="true" />
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
            <Mail className="profile-icon" aria-hidden="true" />
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
            <Phone className="profile-icon" aria-hidden="true" />
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
            <Calendar className="profile-icon" aria-hidden="true" />
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
  );
};

export default PersonalInformation;
