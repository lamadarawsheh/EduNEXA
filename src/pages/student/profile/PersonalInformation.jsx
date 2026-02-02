import React, { useEffect, useState } from "react";
import { Calendar, Mail, Phone, User } from "lucide-react";
import { getStudentProfile, updateStudentProfile } from "../../../services/personalInformationService";
import { getStudentIdFromStorage } from "../../../utils/auth";
import "./Profile.css";

const PersonalInformation = () => {
  const studentId = getStudentIdFromStorage();
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!studentId) {
      setIsLoading(false);
      return;
    }

    let isActive = true;

    const normalizeDate = (value) => {
      if (!value) {
        return "";
      }

      if (value instanceof Date) {
        return value.toISOString().split("T")[0];
      }

      if (typeof value === "string") {
        return value.split("T")[0];
      }

      return "";
    };

    const loadProfile = async () => {
      try {
        const response = await getStudentProfile(studentId);
        if (!isActive) {
          return;
        }

        const data = response?.data;
        if (!data || typeof data !== "object") {
          return;
        }

        setFormData((prev) => ({
          ...prev,
          firstName: data.firstName ?? data.first_name ?? data.firstname ?? prev.firstName,
          lastName: data.lastName ?? data.last_name ?? data.lastname ?? prev.lastName,
          imageUrl: data.imageUrl ?? data.imageURL ?? data.avatarUrl ?? data.profileImage ?? prev.imageUrl,
          userName: data.userName ?? data.user_name ?? data.username ?? prev.userName,
          email: data.email ?? prev.email,
          phoneNumber: data.phoneNumber ?? data.phone ?? data.phoneNo ?? prev.phoneNumber,
          birthDate: normalizeDate(
            data.birthDate ?? data.dateOfBirth ?? data.dob ?? prev.birthDate
          ),
        }));
      } catch (error) {
        if (isActive) {
          console.error("Failed to load student profile:", error);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isActive = false;
    };
  }, [studentId]);

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
          disabled={isSaving || isLoading}
        >
          {isLoading ? "Loading..." : isSaving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default PersonalInformation;
