import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, ChevronRight, Globe, Lock, LogOut } from "lucide-react";
import { getStudentSettings, updateNotifications } from "../../../services/settingService";
import "./Profile.css";

const Settings = () => {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isUpdatingNotifications, setIsUpdatingNotifications] = useState(false);

  useEffect(() => {
    if (!studentId) {
      return;
    }

    let isActive = true;

    const loadSettings = async () => {
      try {
        const response = await getStudentSettings(studentId);
        if (!isActive) {
          return;
        }

        const data = response?.data;
        if (typeof data?.notificationsEnabled === "boolean") {
          setNotificationsEnabled(data.notificationsEnabled);
        }
      } catch (error) {
        if (isActive) {
          console.error("Failed to load student settings:", error);
        }
      }
    };

    loadSettings();

    return () => {
      isActive = false;
    };
  }, [studentId]);

  const handleToggleNotifications = async () => {
    if (isUpdatingNotifications) {
      return;
    }

    const nextValue = !notificationsEnabled;
    setNotificationsEnabled(nextValue);

    if (!studentId) {
      return;
    }

    setIsUpdatingNotifications(true);
    try {
      await updateNotifications(studentId, nextValue);
    } catch (error) {
      console.error("Failed to update notifications:", error);
      setNotificationsEnabled(!nextValue);
    } finally {
      setIsUpdatingNotifications(false);
    }
  };

  const handleLogout = () => {
    // Clear auth tokens here
    // localStorage.removeItem('token');
    navigate("/login");
  };

  return (
    <div className="profile-section relative">
      <div className="profile-section-header">
        <h2 className="profile-section-title">Settings</h2>
        <p className="profile-section-subtitle">Control security, language, and notifications.</p>
      </div>

      <div className="settings-list">
        <Link className="settings-item" to="/student/profile/password">
          <Lock className="profile-icon" aria-hidden="true" />
          <span>Change Password</span>
          <ChevronRight className="profile-icon" aria-hidden="true" />
        </Link>

        <Link className="settings-item" to="/student/profile/language">
          <Globe className="profile-icon" aria-hidden="true" />
          <span>Language</span>
          <ChevronRight className="profile-icon" aria-hidden="true" />
        </Link>

        <div className="settings-item">
          <Bell className="profile-icon" aria-hidden="true" />
          <span>Notices</span>
          <label className="toggle-switch" onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={handleToggleNotifications}
              disabled={isUpdatingNotifications}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="settings-item logout" onClick={handleLogout}>
          <LogOut className="profile-icon" aria-hidden="true" />
          <span>Logout</span>
          <ChevronRight className="profile-icon" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
