import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import Popup from '../../components/common/Popup';
import { forgotPassword } from "../../services/authService";

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [popup, setPopup] = useState({
        show: false,
        title: '',
        message: '',
        type: 'success'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim()) {
            setError('Please enter your email address');
            return;
        }

        setIsLoading(true);

        try {

            await forgotPassword(email);

            localStorage.setItem("resetEmail", email);


            setPopup({
                show: true,
                title: 'Check Your Email',
                message: 'We have sent a password reset code to your email.',
                type: 'success'
            });


            setTimeout(() => {
                navigate('/verify-code');
            }, 1200);

        } catch (err) {
            const errorMessage = err.response?.data?.message || "Something went wrong. Please try again.";
            setError(errorMessage);
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

                {/* Header */}
                <div className="pt-8 pb-6 text-center px-8">
                    <div className="w-20 h-20 bg-[#E0F2F1] rounded-full flex items-center justify-center text-[#4AA59B] shadow-sm mx-auto mb-6">
                        <Mail className="h-10 w-10" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-[#0F172B] mb-2">Forget Password?</h2>
                    <p className="text-gray-500 text-sm">
                        Enter your email and we will send you a verification code.
                    </p>
                </div>

                {/* Form */}
                <div className="px-8 pb-8">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Email Input */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email Address</label>

                            <div className="relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 
                                    ${error ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#0F4C4A]'}`}>
                                    <Mail className="h-5 w-5" />
                                </div>

                                <input
                                    type="email"
                                    placeholder="ex. ahmad@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all duration-200 text-sm text-gray-700 placeholder-gray-400
                                        ${error
                                            ? 'border-red-300 focus:ring-4 focus:ring-red-100 bg-red-50'
                                            : 'border-gray-200 hover:border-[#4AA59B]/50 focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 bg-gray-50 focus:bg-white'
                                        }`}
                                />
                            </div>

                            {error && (
                                <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{error}</p>
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
                                    Sending Code...
                                </>
                            ) : (
                                "Send Verification Code"
                            )}
                        </button>
                    </form>

                    {/* Back to Login */}
                    <div className="mt-8 text-center">
                        <Link
                            to="/login"
                            className="inline-flex items-center text-gray-500 hover:text-[#0F4C4A] transition-colors text-sm font-medium gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
