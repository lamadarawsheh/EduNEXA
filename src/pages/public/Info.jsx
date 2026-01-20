import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Loader2 } from 'lucide-react';
import Popup from '../../components/common/Popup';

const Info = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [popup, setPopup] = useState({ show: false, title: '', message: '', type: 'error' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.phone) newErrors.phone = 'Phone number is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);
            try {
                // Mock API
                await new Promise(resolve => setTimeout(resolve, 1500));
                // Navigate to dashboard
                navigate('/student');
            } catch (error) {
                setPopup({ show: true, title: 'Error', message: 'Something went wrong.', type: 'error' });
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
                <div className="pt-8 pb-6 text-center px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-[#0F172B] mb-2">Welcome to EduNEXA</h2>
                    <p className="text-gray-500 text-sm">Please complete your profile details to continue.</p>
                </div>

                <div className="px-8 pb-8">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Name Input */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Full Name</label>
                            <div className="relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${errors.username ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#0F4C4A]'}`}>
                                    <User className="h-5 w-5" />
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Enter your name"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all duration-200 text-sm text-gray-700 placeholder-gray-400
                                    ${errors.username
                                            ? 'border-red-300 focus:ring-4 focus:ring-red-100 bg-red-50'
                                            : 'border-gray-200 hover:border-[#4AA59B]/50 focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 bg-gray-50 focus:bg-white'
                                        }`}
                                />
                            </div>
                            {errors.username && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.username}</p>}
                        </div>

                        {/* Email Input */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email Address</label>
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

                        {/* Phone Input */}
                        <div className="group">
                            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Phone Number</label>
                            <div className="relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-200 ${errors.phone ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#0F4C4A]'}`}>
                                    <Phone className="h-5 w-5" />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all duration-200 text-sm text-gray-700 placeholder-gray-400
                                    ${errors.phone
                                            ? 'border-red-300 focus:ring-4 focus:ring-red-100 bg-red-50'
                                            : 'border-gray-200 hover:border-[#4AA59B]/50 focus:border-[#4AA59B] focus:ring-4 focus:ring-[#4AA59B]/10 bg-gray-50 focus:bg-white'
                                        }`}
                                />
                            </div>
                            {errors.phone && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.phone}</p>}
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
                                    Completing Signup...
                                </>
                            ) : (
                                "Complete Sign Up"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Info;