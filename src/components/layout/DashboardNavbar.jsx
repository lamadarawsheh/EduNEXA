import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Bell,
    ChevronDown,
    Heart,
    User,
    LogOut
} from 'lucide-react';
import { logout } from '../../services/authService';
import api from '../../services/api';

const DashboardNavbar = ({ role = 'student' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const apiRoot = api?.defaults?.baseURL?.replace(/\/api\/?$/, '') || '';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const studentLinks = [
        { name: 'Home', path: '/student' },
        { name: 'Available Courses', path: '/student/available-courses' },
        { name: 'My Courses', path: '/student/my-courses' },
        { name: 'My Favourites', path: '/student/favourite' },
    ];

    const teacherLinks = [
        { name: 'Home', path: '/teacher' },
        { name: 'My Courses', path: '/teacher/mycourses' },
        { name: 'Create New Course', path: '/teacher/create-new-course' },
        { name: 'Earnings', path: '/teacher/earnings' },
        { name: 'Settings', path: '/teacher/teacher-settings' },
    ];

    const links = role === 'teacher' ? teacherLinks : studentLinks;

    const resolveImageUrl = (value) => {
        if (!value || typeof value !== 'string') return '';
        const trimmed = value.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('blob:')) {
            return trimmed;
        }
        if (!apiRoot) return trimmed;
        return `${apiRoot}/${trimmed.replace(/^\//, '')}`;
    };

    const getStoredProfileImage = () => {
        const stored = localStorage.getItem('profileImageUrl');
        if (stored) return stored;
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return (
            user.imageUrl ||
            user.imageURL ||
            user.avatarUrl ||
            user.profileImage ||
            user.profileImageUrl ||
            user.image ||
            user.user?.imageUrl ||
            user.user?.imageURL ||
            user.user?.avatarUrl ||
            user.user?.profileImage ||
            user.user?.profileImageUrl ||
            ''
        );
    };

    useEffect(() => {
        const updateImage = (value) => {
            const resolved = resolveImageUrl(value || getStoredProfileImage());
            setProfileImage(resolved);
        };

        updateImage();

        const handleStorage = (event) => {
            if (event.key === 'profileImageUrl' || event.key === 'user') {
                updateImage();
            }
        };

        const handleProfileUpdate = (event) => {
            if (event?.detail?.url) {
                updateImage(event.detail.url);
            }
        };

        window.addEventListener('storage', handleStorage);
        window.addEventListener('profile-image-updated', handleProfileUpdate);
        return () => {
            window.removeEventListener('storage', handleStorage);
            window.removeEventListener('profile-image-updated', handleProfileUpdate);
        };
    }, [apiRoot]);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
            {/* Logo (Left Section) */}
            <div className="flex-shrink-0">
                <Link to={role === 'teacher' ? '/teacher' : '/student'} className="flex items-center space-x-2">
                    <div className="h-10 w-10 overflow-hidden flex items-center justify-center -translate-y-1">
                        <img
                            src="/favicon-removebg-preview.png"
                            alt="EduNEXA Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <span className="text-2xl text-[#0F172B] font-bold tracking-tighter uppercase">
                        EDUNEXA
                    </span>
                </Link>
            </div>

            {/* Middle Section (Navigation Links) */}
            <div className="hidden lg:flex flex-1 justify-center items-center gap-8 text-sm text-[#45556C]">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`hover:text-black transition-colors whitespace-nowrap ${location.pathname === link.path ? 'text-black font-bold border-b-2 border-[#0F4C4A]' : ''}`}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Right Section (Icons & Profile) */}
            <div className="flex items-center gap-6 flex-shrink-0">
                <div className="hidden lg:flex items-center gap-6">
                    <button className="relative text-[#45556C] hover:text-black transition-colors">
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setShowProfile(!showProfile)}
                            className="flex items-center gap-2 group focus:outline-none"
                        >
                            <div className="w-10 h-10 rounded-full border-2 border-teal-100 overflow-hidden bg-teal-50 flex items-center justify-center text-[#0F4C4A] transition-all group-hover:bg-[#0F4C4A] group-hover:text-white group-hover:border-[#0F4C4A]">
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                        onError={() => setProfileImage('')}
                                    />
                                ) : (
                                    <User size={20} />
                                )}
                            </div>
                            <ChevronDown size={14} className={`text-[#45556C] transition-transform duration-200 ${showProfile ? 'rotate-180' : ''}`} />
                        </button>
                        {showProfile && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowProfile(false)}
                                ></div>
                                <div className="absolute top-full right-0 w-48 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                                    <Link to={`/${role}/profile`} onClick={() => setShowProfile(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                        <User size={16} /> My Profile
                                    </Link>
                                    <Link to={role === 'teacher' ? '/teacher/teacher-settings' : '/student/profile/settings'} onClick={() => setShowProfile(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                        Settings
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-50 mt-1"
                                    >
                                        <LogOut size={16} /> Sign Out
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-[#0F172B]">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-50 flex flex-col items-center lg:hidden py-8 space-y-6 font-medium z-50">
                    {links.map((link) => (
                        <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="text-lg text-gray-700 hover:text-[#0F4C4A] transition-colors">{link.name}</Link>
                    ))}
                    <div className="w-4/5 border-t border-gray-100 pt-6 flex flex-col items-center space-y-4">
                        <Link to={`/${role}/profile`} onClick={() => setIsOpen(false)} className="text-gray-700 font-bold">My Profile</Link>
                        <button
                            onClick={handleLogout}
                            className="bg-[#0F4C4A] text-white w-full py-3 rounded-xl font-bold shadow-lg"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default DashboardNavbar;
