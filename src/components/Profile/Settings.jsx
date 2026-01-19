import React, { useState } from "react";
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

  const handleChangeLanguage = () => {
    // Logic for changing language
    console.log("Change language clicked");
  };

  const handleLogout = () => {
    // Logic for logout
    console.log("Logout clicked");
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
            <button className="tab-btn">Personal Information</button>
            <button className="tab-btn active">Settings</button>
          </div>
        </div>

        <div className="settings-list">
          <div className="settings-item" onClick={handleChangePassword}>
            <i className="icon-lock"></i>
            <span>Change Password</span>
            <i className="icon-arrow-right"></i>
          </div>

          <div className="settings-item" onClick={handleChangeLanguage}>
            <i className="icon-globe"></i>
            <span>Language</span>
            <i className="icon-arrow-right"></i>
          </div>

          <div className="settings-item">
            <i className="icon-bell"></i>
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
            <i className="icon-logout"></i>
            <span>Logout</span>
            <i className="icon-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
