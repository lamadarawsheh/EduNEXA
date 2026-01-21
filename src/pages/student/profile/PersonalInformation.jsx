import React, { useState } from "react";
import { Calendar, Mail, Phone, User } from "lucide-react";
import { updateStudentProfile } from "../../../services/personalInformationService";
import "./Profile.css";

const PersonalInformation = () => {
  const studentId = localStorage.getItem("studentId");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    imageUrl: "",
    userName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!studentId) {
      alert("Missing student id. Please sign in again.");
      return;
    }

    try {
      setIsSaving(true);
      await updateStudentProfile(studentId, formData);
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Failed to update student profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profile-section">
      <div className="profile-section-header">
        <h2 className="profile-section-title">Personal information</h2>
        <p className="profile-section-subtitle">Update your name, email, and contact details.</p>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            <User className="profile-icon" aria-hidden="true" />
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
          />
        </div>

        <div className="form-group">
          <label>
            <User className="profile-icon" aria-hidden="true" />
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
          />
        </div>

        <div className="form-group">
          <label>
            <User className="profile-icon" aria-hidden="true" />
            Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

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
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default PersonalInformation;
