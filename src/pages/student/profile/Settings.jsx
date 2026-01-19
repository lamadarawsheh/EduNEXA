import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, ChevronRight, Globe, Lock, LogOut } from "lucide-react";
import "./Profile.css";

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleChangePassword = () => {
    // Logic for changing password
    console.log("Change password clicked");
  };

  const handleLogout = () => {
    // Logic for logout
    console.log("Logout clicked");
  };

  return (
    <div className="profile-section">
      <div className="profile-section-header">
        <h2 className="profile-section-title">Settings</h2>
        <p className="profile-section-subtitle">Control security, language, and notifications.</p>
      </div>

      <div className="settings-list">
        <div className="settings-item" onClick={handleChangePassword}>
          <Lock className="profile-icon" aria-hidden="true" />
          <span>Change Password</span>
          <ChevronRight className="profile-icon" aria-hidden="true" />
        </div>

        <Link className="settings-item" to="/student/profile/language">
          <Globe className="profile-icon" aria-hidden="true" />
          <span>Language</span>
          <ChevronRight className="profile-icon" aria-hidden="true" />
        </Link>

        <div className="settings-item">
          <Bell className="profile-icon" aria-hidden="true" />
          <span>Notices</span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={handleToggleNotifications}
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
