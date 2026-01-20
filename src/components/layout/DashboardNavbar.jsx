import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Bell,
    ChevronDown,
    X,
    Heart,
    User,
    LogOut
} from 'lucide-react';

const DashboardNavbar = ({ role = 'student' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showFavs, setShowFavs] = useState(false);
    const location = useLocation();

    const studentLinks = [
        { name: 'Home', path: '/student' },
        { name: 'Available Courses', path: '/student/available-courses' },
        { name: 'My Courses', path: '/student/my-courses' },
    ];

    const teacherLinks = [
        { name: 'Home', path: '/teacher' },
        { name: 'My Courses', path: '/teacher/my-courses' },
        { name: 'Create New Course', path: '/teacher/create-new-course' },
        { name: 'Earnings', path: '/teacher/earnings' },
        { name: 'Settings', path: '/teacher/settings' },
    ];

    const links = role === 'teacher' ? teacherLinks : studentLinks;

    // Mock data for favourites
    const favInstructors = ["Dr. Angela Yu", "Gary Simon"];
    const favCourses = ["Complete Web BootCamp", "Advanced UI/UX"];

    return (
        <nav className="sticky top-0 z-50 bg-white/50 backdrop-blur-md border-b border-white/5 px-4 py-4 flex items-center justify-between relative">
            {/* Logo (Left) */}
            <Link to={role === 'teacher' ? '/teacher' : '/student'} className="flex items-center space-x-2 ps-2 shrink-0">
                <img
                    src="/image/logo-landing.png"
                    alt="EduNEXA Logo"
                    className="h-8 w-auto"
                />
                <span className="text-2xl text-[#0F172B] font-bold tracking-tighter uppercase">
                    EDUNEXA
                </span>
            </Link>

            {/* Middle Navigation - Horizontally Centered */}
            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-sm text-[#45556C] h-full">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`hover:text-black transition-colors whitespace-nowrap ${location.pathname === link.path ? 'text-black font-bold' : ''}`}
                    >
                        {link.name}
                    </Link>
                ))}

                {role === 'student' && (
                    <div
                        className="relative"
                        onMouseEnter={() => setShowFavs(true)}
                        onMouseLeave={() => setShowFavs(false)}
                    >
                        <button className="flex items-center gap-1 hover:text-black transition-colors whitespace-nowrap">
                            Favourites <ChevronDown size={14} />
                        </button>
                        {showFavs && (
                            <div className="absolute top-full right-0 w-56 mt-2 bg-white rounded-md shadow-lg border border-gray-100 p-4 animate-in fade-in slide-in-from-top-1 z-50">
                                <div className="mb-3">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Instructors</p>
                                    {favInstructors.map(name => (
                                        <div key={name} className="py-1 text-gray-600 hover:text-black cursor-pointer text-xs font-medium">{name}</div>
                                    ))}
                                </div>
                                <div className="pt-2 border-t border-gray-50">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Courses</p>
                                    {favCourses.map(title => (
                                        <div key={title} className="py-1 text-gray-600 hover:text-black cursor-pointer text-xs font-medium line-clamp-1">{title}</div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Right Icons & Profile (Right) */}
            <div className="flex items-center gap-6 shrink-0">
                <div className="hidden lg:flex items-center gap-6">
                    <button className="relative text-[#45556C] hover:text-black transition-colors">
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#0F4C4A] rounded-full"></span>
                    </button>

                    <div
                        className="relative"
                        onMouseEnter={() => setShowProfile(true)}
                        onMouseLeave={() => setShowProfile(false)}
                    >
                        <button className="flex items-center gap-2 group focus:outline-none">
                            <div className="w-9 h-9 rounded-full border-2 border-transparent group-hover:border-[#0F4C4A]/20 transition-all overflow-hidden bg-gray-100">
                                <img
                                    src={role === 'teacher'
                                        ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60"
                                        : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60"
                                    }
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <ChevronDown size={14} className="text-[#45556C] group-hover:text-black transition-colors" />
                        </button>
                        {showProfile && (
                            <div className="absolute top-full right-0 w-48 mt-2 bg-white rounded-md shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-1 z-50">
                                <Link to={`/${role}/profile`} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                    <User size={16} /> My Profile
                                </Link>
                                <Link to="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                    Settings
                                </Link>
                                <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t mt-1">
                                    <LogOut size={16} /> Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Burger Menu */}
                <div className="lg:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none text-[#0F172B]">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-md text-[#45556C] flex flex-col items-center lg:hidden py-6 space-y-4 font-medium animate-in fade-in slide-in-from-top-2">
                    {links.map((link) => (
                        <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="hover:text-black transition-colors">{link.name}</Link>
                    ))}
                    {role === 'student' && (
                        <Link to="/student/favourites" onClick={() => setIsOpen(false)} className="hover:text-black transition-colors flex items-center gap-2">
                            <Heart size={16} /> Favourites
                        </Link>
                    )}
                    <div className="w-3/4 border-t border-gray-100 flex flex-col items-center pt-4 space-y-4">
                        <Link to={`/${role}/profile`} onClick={() => setIsOpen(false)} className="hover:text-black transition-colors">Profile</Link>
                        <button className="text-white px-6 py-2 bg-[#0F4C4A] rounded-md hover:bg-[#0F3B36] transition-all w-full max-w-[200px]">Sign Out</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default DashboardNavbar;
