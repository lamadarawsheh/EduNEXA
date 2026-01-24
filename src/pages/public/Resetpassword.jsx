import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import Popup from '../../components/common/Popup';
import { resetPassword } from "../../services/authService";

const ResetPassword = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [popup, setPopup] = useState({
        show: false,
        title: '',
        message: '',
        type: 'success'
    });

    // Validate password fields
    const validate = () => {
        const newErrors = {};

        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        const email = localStorage.getItem("resetEmail");
        const token = localStorage.getItem("resetToken");

        if (!email || !token) {
            setPopup({
                show: true,
                title: 'Session Expired',
                message: 'Your reset session has expired. Please start over.',
                type: 'error'
            });
            setTimeout(() => navigate('/forgot-password'), 2000);
            return;
        }

        setIsLoading(true);

        try {
            // Call real API
            await resetPassword(email, token, formData.password, formData.confirmPassword);

            // Clean up
            localStorage.removeItem("resetEmail");
            localStorage.removeItem("resetToken");

            // Show success popup
            setPopup({
                show: true,
                title: 'Success!',
                message: 'Your password has been reset successfully.',
                type: 'success'
            });

            // Redirect to login
            setTimeout(() => navigate('/login'), 2000);

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to reset password. Please try again.';
            setPopup({
                show: true,
                title: 'Error',
                message: errorMessage,
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#4AA59B] to-[#0F4C4A] relative overflow-hidden">

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-12 opacity-10 text-white transform rotate-45 pointer-events-none">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                </svg>
            </div>

            {/* Popup */}
            <Popup
                isOpen={popup.show}
                title={popup.title}
                message={popup.message}
                type={popup.type}
                onClose={() => setPopup({ ...popup, show: false })}
            />

            <div className="bg-white w-full max-w-[450px] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500 mx-auto">
                <div className="pt-8 pb-6 text-center px-8">
                    <div className="w-20 h-20 bg-[#E0F2F1] rounded-full flex items-center justify-center text-[#4AA59B] shadow-sm mx-auto mb-6">
                        <Lock className="h-10 w-10" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-[#0F172B] mb-2">Reset Password</h2>
                    <p className="text-gray-500 text-sm">Please set a new password for your account.</p>
                </div>

                <div className="px-8 pb-8">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* New Password */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">New Password</label>
                            <div className="relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 
                                    ${errors.password ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#0F4C4A]'}`}>
                                    <Lock className="h-5 w-5" />
                                </div>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className={`w-full pl-10 pr-12 py-3 border rounded-xl outline-none transition-all duration-200 text-sm text-gray-700 placeholder-gray-400
                                        ${errors.password
                                            ? 'border-red-300 focus:ring-4 focus:ring-red-100 bg-red-50'
                                            : 'border-gray-200 hover:border-[#4AA59B]/50 focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 bg-gray-50 focus:bg-white'
                                        }`}
                                />

                                {/* Toggle password visibility */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#0F4C4A] transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Confirm Password</label>
                            <div className="relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 
                                    ${errors.confirmPassword ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#0F4C4A]'}`}>
                                    <Lock className="h-5 w-5" />
                                </div>

                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm new password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className={`w-full pl-10 pr-12 py-3 border rounded-xl outline-none transition-all duration-200 text-sm text-gray-700 placeholder-gray-400
                                        ${errors.confirmPassword
                                            ? 'border-red-300 focus:ring-4 focus:ring-red-100 bg-red-50'
                                            : 'border-gray-200 hover:border-[#4AA59B]/50 focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 bg-gray-50 focus:bg-white'
                                        }`}
                                />

                                {/* Toggle confirm password visibility */}
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#0F4C4A] transition-colors cursor-pointer"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>

                            {errors.confirmPassword && (
                                <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-[#4E9F96] hover:bg-[#3d9b90] text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all active:scale-[0.98] duration-200 text-sm flex items-center justify-center
                                ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
                            `}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Resetting Password...
                                </>
                            ) : (
                                "Confirm New Password"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
