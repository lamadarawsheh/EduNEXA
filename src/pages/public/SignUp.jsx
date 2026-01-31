import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Facebook, Phone, Loader2 } from 'lucide-react';
import Popup from '../../components/common/Popup';
import WelcomeAnimation from '../../components/common/WelcomeAnimation';
import { register as registerService } from '../../services/authService';

const SignUp = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Initialize role based on query parameter
    const [role, setRole] = useState('Student');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const urlRole = params.get('role');
        if (urlRole === 'Instructor' || urlRole === 'Student') {
            setRole(urlRole);
        }
    }, [location]);

    const [showPassword, setShowPassword] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [popup, setPopup] = useState({ show: false, title: '', message: '', type: 'success' });
    const [showWelcome, setShowWelcome] = useState(false);

    // Handlers
    const handleChange = (e) => {
        let value = e.target.value;

        // Restrict Phone Number to digits only
        if (e.target.name === 'phoneNumber') {
            value = value.replace(/\D/g, '');
        }

        setFormData({ ...formData, [e.target.name]: value });
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};

        // Username
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (!/[a-zA-Z]/.test(formData.username)) {
            newErrors.username = 'Username must contain at least one letter';
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email';

        // Phone Number
        if (!/^\d{10,}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Enter a valid phone number (min 10 digits)';

        // Password
        const password = formData.password;
        if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = 'Password must contain at least one uppercase letter';
        } else if (!/[a-z]/.test(password)) {
            newErrors.password = 'Password must contain at least one lowercase letter';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            newErrors.password = 'Password must contain at least one special character';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const showPopup = (title, message, type = 'success') => {
        setPopup({ show: true, title, message, type });
    };

    const handlePopupClose = () => {
        setPopup({ ...popup, show: false });
    };

    const handleWelcomeComplete = () => {
        // Redirect based on role
        if (role === 'Instructor') {
            navigate('/teacher');
        } else {
            navigate('/student');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);

            const payload = {
                username: formData.username,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                password: formData.password,
                roles: [role]
            };

            try {
                const data = await registerService(payload);

                console.log("Registration Success:", data);

                // Store Authentication Data consistently for ProtectedRoute
                localStorage.setItem('user', JSON.stringify(data.user || data));
                if (data.token) localStorage.setItem('token', data.token);

                // Show animation instead of popup
                setShowWelcome(true);
            } catch (error) {
                console.error("Registration Error:", error);
                const errorMessage = error.response?.data?.message || "We couldn't create your account. Please try again.";
                showPopup("Registration Failed", errorMessage, 'error');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#4AA59B] to-[#0F4C4A] relative overflow-hidden">

            {showWelcome && (
                <WelcomeAnimation
                    username={formData.username}
                    role={role === 'Instructor' ? 'Instructor' : 'Student'}
                    onComplete={handleWelcomeComplete}
                />
            )}

            <Popup
                isOpen={popup.show}
                title={popup.title}
                message={popup.message}
                type={popup.type}
                onClose={handlePopupClose}
                actionLabel="Try Again"
            />

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-12 opacity-10 text-white transform rotate-45 pointer-events-none">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                </svg>
            </div>

            <div className="bg-white w-full max-w-[450px] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500 mx-auto">

                {/* Header */}
                <div className="pt-8 pb-4 text-center px-8">
                    <Link to="/choose" className="flex justify-center items-center gap-2 mb-2 hover:opacity-80 transition-opacity inline-flex">
                        <div className="w-10 h-10 bg-[#4AA59B] rounded-full flex items-center justify-center text-white shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tighter text-[#0F172B]">EDUNEXA</h1>
                    </Link>
                    <p className="text-gray-500 text-sm">Join Us As A ...</p>
                </div>

                {/* Role Tabs */}
                <div className="flex border-t border-b border-gray-100">
                    <button
                        onClick={() => setRole('Student')}
                        className={`flex-1 py-4 text-center font-medium text-sm transition-all duration-300 relative
                            ${role === 'Student' ? 'bg-[#E0F2F1] text-[#0F4C4A]' : 'text-gray-500 hover:bg-gray-50'}
                        `}
                    >
                        Student
                        {role === 'Student' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#0F4C4A] rounded-t-full" />}
                    </button>
                    <button
                        onClick={() => setRole('Instructor')}
                        className={`flex-1 py-4 text-center font-medium text-sm transition-all duration-300 relative
                            ${role === 'Instructor' ? 'bg-[#E0F2F1] text-[#0F4C4A]' : 'text-gray-500 hover:bg-gray-50'}
                        `}
                    >
                        Instructor
                        {role === 'Instructor' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#0F4C4A] rounded-t-full" />}
                    </button>
                </div>

                {/* Form Content */}
                <div className="px-8 py-6">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Username Input */}
                        <div className="group">
                            <div className="relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${errors.username ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#0F4C4A]'}`}>
                                    <User className="h-5 w-5" />
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="ex. Ahmad2024"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all duration-200 text-sm text-gray-700 placeholder-gray-400
                                    ${errors.username
                                            ? 'border-red-300 focus:ring-4 focus:ring-red-100 bg-red-50'
                                            : 'border-gray-200 hover:border-[#4AA59B]/50 focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 bg-gray-50 focus:bg-white'
                                        }
                                `}
                                />
                            </div>
                            {errors.username && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.username}</p>}
                        </div>

                        {/* Email Input */}
                        <div className="group">
                            <div className="relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${errors.email ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#0F4C4A]'}`}>
                                    <Mail className="h-5 w-5" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="ex. ahmad@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all duration-200 text-sm text-gray-700 placeholder-gray-400
                                    ${errors.email
                                            ? 'border-red-300 focus:ring-4 focus:ring-red-100 bg-red-50'
                                            : 'border-gray-200 hover:border-[#4AA59B]/50 focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 bg-gray-50 focus:bg-white'
                                        }
                                `}
                                />
                            </div>
                            {errors.email && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.email}</p>}
                        </div>

                        {/* Phone Number Input */}
                        <div className="group">
                            <div className="relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${errors.phoneNumber ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#0F4C4A]'}`}>
                                    <Phone className="h-5 w-5" />
                                </div>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder="ex. 0791234567"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all duration-200 text-sm text-gray-700 placeholder-gray-400
                                    ${errors.phoneNumber
                                            ? 'border-red-300 focus:ring-4 focus:ring-red-100 bg-red-50'
                                            : 'border-gray-200 hover:border-[#4AA59B]/50 focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 bg-gray-50 focus:bg-white'
                                        }
                                `}
                                />
                            </div>
                            {errors.phoneNumber && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.phoneNumber}</p>}
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
                                    placeholder="Enter Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-12 py-3 border rounded-xl outline-none transition-all duration-200 text-sm text-gray-700 placeholder-gray-400
                                    ${errors.password
                                            ? 'border-red-300 focus:ring-4 focus:ring-red-100 bg-red-50'
                                            : 'border-gray-200 hover:border-[#4AA59B]/50 focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 bg-gray-50 focus:bg-white'
                                        }
                                `}
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

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-[#4E9F96] hover:bg-[#3d9b90] text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all active:scale-[0.98] duration-200 mt-2 text-sm flex items-center justify-center
                                ${isLoading ? 'opacity-70 cursor-not-allowed hover:bg-[#4E9F96] hover:shadow-lg hover:translate-y-0' : ''}
                            `}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing Up...
                                </>
                            ) : (
                                "Sign Up"
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
                            Sign Up With Google
                        </button>
                        <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl shadow-sm bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium text-sm group">
                            <Facebook className="h-5 w-5 mr-3 text-blue-600 group-hover:scale-110 transition-transform" />
                            Sign Up With Facebook
                        </button>
                    </div>

                    {/* Footer Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            Already have an Account?{' '}
                            <Link to="/login" className="text-[#4E9F96] font-bold hover:text-[#0F4C4A] hover:underline transition-colors">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
