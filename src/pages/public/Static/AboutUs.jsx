import React from 'react';
import { Users, Award, Target, Globe } from 'lucide-react';

const AboutUs = () => {
    return (
        <div className="bg-gradient-to-r from-[#FCFFFE] via-[#F9FEFD] to-[#F5FDFC] min-h-screen">

            {/* Hero Section */}
            <div className="bg-[#0F4C4A] text-white py-20 px-4 text-center relative overflow-hidden">
                <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold">Empowering the Future</h1>
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                        At EduNEXA, we believe that education is the key to unlocking human potential. We are on a mission to make high-quality learning accessible to everyone, everywhere.
                    </p>
                </div>
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 p-12 opacity-10 transform rotate-45 pointer-events-none">
                    <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                    </svg>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">

                {/* Our Mission Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-14 h-14 bg-[#E0F2F1] rounded-2xl flex items-center justify-center text-[#0F4C4A] mb-6">
                            <Target className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-[#0F172B] mb-3">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed">
                            To bridge the gap between traditional education and industry demands by providing practical, skills-based learning.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-14 h-14 bg-[#E0F2F1] rounded-2xl flex items-center justify-center text-[#0F4C4A] mb-6">
                            <Globe className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-[#0F172B] mb-3">Our Vision</h3>
                        <p className="text-gray-600 leading-relaxed">
                            A world where anyone, regardless of their background or location, can access world-class education and build a successful career.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-14 h-14 bg-[#E0F2F1] rounded-2xl flex items-center justify-center text-[#0F4C4A] mb-6">
                            <Users className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-[#0F172B] mb-3">Community</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Building a vibrant, supportive community of learners and mentors who help each other grow and succeed.
                        </p>
                    </div>
                </div>

                {/* Story Section */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                    {/* Abstract Illustration Side */}
                    <div className="md:w-1/2 relative bg-[#0F4C4A] min-h-[300px] flex items-center justify-center p-12 overflow-hidden">
                        {/* Decorative Circles */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#4AA59B]/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

                        {/* Central Icon Composition */}
                        <div className="relative z-10 grid grid-cols-2 gap-4 rotate-12">
                            <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/10">
                                <Award className="w-10 h-10 text-white" />
                            </div>
                            <div className="w-24 h-24 bg-[#4AA59B] rounded-2xl flex items-center justify-center shadow-lg translate-y-8">
                                <Globe className="w-10 h-10 text-white" />
                            </div>
                            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg -translate-y-4">
                                <Target className="w-10 h-10 text-[#0F4C4A]" />
                            </div>
                            <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-white/10 translate-y-4">
                                <Users className="w-10 h-10 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-[#4AA59B] font-bold tracking-wide uppercase text-sm mb-4">
                            <Award className="w-5 h-5" />
                            <span>Our Story</span>
                        </div>
                        <h2 className="text-3xl font-bold text-[#0F172B] mb-6">Built by Education, Driven by Passion</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            EduNEXA started with a simple idea: education should be engaging, effective, and accessible. What began as a small project has grown into a global platform serving thousands of students. We are working together to redefine online learning through innovation and technology.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutUs;
