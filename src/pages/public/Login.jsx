import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Facebook, Loader2 } from 'lucide-react';
import Popup from '../../components/common/popup';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [popup, setPopup] = useState({ show: false, title: '', message: '', type: 'error' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);
            try {
                // Determine API Endpoint based on role (Mock logic or use single endpoint)
                // For now, we'll try the generic login endpoint if it exists, or just logic
                // const response = await fetch('http://edunexa.runasp.net/api/auth/login', { ... });

                // Simulating API Call
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Mock Success
                localStorage.setItem('token', 'mock-token');
                // You might normally decode token to get role, here we mock it
                navigate('/student');

            } catch (error) {
                setPopup({ show: true, title: 'Login Failed', message: 'Invalid credentials', type: 'error' });
            } finally {
                setIsLoading(false);
            }
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
                    <Link to="/landing" className="flex justify-center items-center gap-2 mb-2 hover:opacity-80 transition-opacity inline-flex">
                        <div className="w-10 h-10 bg-[#4AA59B] rounded-full flex items-center justify-center text-white shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tighter text-[#0F172B]">EDUNEXA</h1>
                    </Link>
                    <p className="text-gray-500 text-sm">Welcome back! Please login to continue.</p>
                </div>

                <div className="px-8 py-6">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email Input */}
                        <div className="group">
                            <div className="relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${errors.email ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#0F4C4A]'}`}>
                                    <Mail className="h-5 w-5" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all duration-200 text-sm text-gray-700 placeholder-gray-400
                                    ${errors.email
                                            ? 'border-red-300 focus:ring-4 focus:ring-red-100 bg-red-50'
                                            : 'border-gray-200 hover:border-[#4AA59B]/50 focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 bg-gray-50 focus:bg-white'
                                        }`}
                                />
                            </div>
                            {errors.email && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.email}</p>}
                        </div>

                        {/* Password Input */}
                        <div className="group">
                            <div className="relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${errors.password ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#0F4C4A]'}`}>
                                    <Lock className="h-5 w-5" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-12 py-3 border rounded-xl outline-none transition-all duration-200 text-sm text-gray-700 placeholder-gray-400
                                    ${errors.password
                                            ? 'border-red-300 focus:ring-4 focus:ring-red-100 bg-red-50'
                                            : 'border-gray-200 hover:border-[#4AA59B]/50 focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 bg-gray-50 focus:bg-white'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#0F4C4A] transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.password}</p>}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#4AA59B] focus:ring-[#4AA59B] cursor-pointer" />
                                <span className="text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="text-[#4E9F96] font-semibold hover:text-[#0F4C4A] hover:underline transition-colors">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-[#4E9F96] hover:bg-[#3d9b90] text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all active:scale-[0.98] duration-200 text-sm flex items-center justify-center
                                ${isLoading ? 'opacity-70 cursor-not-allowed hover:bg-[#4E9F96] hover:shadow-lg hover:translate-y-0' : ''}
                            `}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Logging In...
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <span className="relative px-3 bg-white text-gray-400 text-xs font-medium uppercase tracking-wider">
                            OR
                        </span>
                    </div>

                    {/* Social Buttons */}
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium text-sm group">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                            Login With Google
                        </button>
                        <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium text-sm group">
                            <Facebook className="h-5 w-5 mr-3 text-blue-600 group-hover:scale-110 transition-transform" />
                            Login With Facebook
                        </button>
                    </div>

                    {/* Footer Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            Don't have an Account?{' '}
                            <Link to="/signup" className="text-[#4E9F96] font-bold hover:text-[#0F4C4A] hover:underline transition-colors">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
