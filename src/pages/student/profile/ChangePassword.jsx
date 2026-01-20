import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, Save, Lock } from "lucide-react";
import "./Profile.css";

const ChangePassword = () => {
    // Password Form State
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: ""
    });
    const [errors, setErrors] = useState({});
    const [showPass, setShowPass] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const togglePassVisibility = (field) => {
        setShowPass(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handlePassChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!passwords.current) newErrors.current = "Current password is required";
        if (!passwords.new) {
            newErrors.new = "New password is required";
        } else if (passwords.new.length < 8) {
            newErrors.new = "Password must be at least 8 characters";
        }
        if (passwords.new !== passwords.confirm) newErrors.confirm = "Passwords do not match";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSavePassword = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert("Password changed successfully!");
            setPasswords({ current: "", new: "", confirm: "" });
        } catch (error) {
            alert("Failed to change password");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="profile-section">
            <Link to="/student/profile/settings" className="mb-4 flex w-fit items-center gap-2 text-sm text-gray-500 hover:text-teal-600 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Settings</span>
            </Link>

            <div className="profile-section-header">
                <h2 className="profile-section-title">Change Password</h2>
                <p className="profile-section-subtitle">Update your password to keep your account secure.</p>
            </div>

            <div className="w-full mt-6">
                <form onSubmit={handleSavePassword} className="space-y-6">
                    {/* Current Password */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Current Password</label>
                        <div className="relative">
                            <input
                                type={showPass.current ? "text" : "password"}
                                name="current"
                                value={passwords.current}
                                onChange={handlePassChange}
                                className={`w-full rounded-xl border px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 transition-all ${errors.current ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-teal-500 focus:ring-teal-100 bg-gray-50/50"
                                    }`}
                                placeholder="Enter current password"
                            />
                            <button type="button" onClick={() => togglePassVisibility('current')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {showPass.current ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.current && <p className="text-xs text-red-500">{errors.current}</p>}
                    </div>

                    {/* New Password */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">New Password</label>
                        <div className="relative">
                            <input
                                type={showPass.new ? "text" : "password"}
                                name="new"
                                value={passwords.new}
                                onChange={handlePassChange}
                                className={`w-full rounded-xl border px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 transition-all ${errors.new ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-teal-500 focus:ring-teal-100 bg-gray-50/50"
                                    }`}
                                placeholder="Min 8 characters"
                            />
                            <button type="button" onClick={() => togglePassVisibility('new')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {showPass.new ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.new && <p className="text-xs text-red-500">{errors.new}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showPass.confirm ? "text" : "password"}
                                name="confirm"
                                value={passwords.confirm}
                                onChange={handlePassChange}
                                className={`w-full rounded-xl border px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 transition-all ${errors.confirm ? "border-red-300 focus:border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-teal-500 focus:ring-teal-100 bg-gray-50/50"
                                    }`}
                                placeholder="Re-enter new password"
                            />
                            <button type="button" onClick={() => togglePassVisibility('confirm')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {showPass.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.confirm && <p className="text-xs text-red-500">{errors.confirm}</p>}
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition-all hover:bg-teal-700 hover:shadow-teal-700/30 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
                        >
                            {isSubmitting ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Change Password
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
