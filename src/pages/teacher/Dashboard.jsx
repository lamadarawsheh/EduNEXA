import React from 'react';

const TeacherDashboard = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
            <div className="text-center animate-in fade-in zoom-in duration-700">
                <div className="w-24 h-24 bg-[#F0F9F8] rounded-full flex items-center justify-center mx-auto mb-6 text-[#4AA59B]">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-[#0F172B] mb-4">Welcome Back!</h1>
                <p className="text-gray-500 max-w-md mx-auto font-medium">
                    This is your personal learning space. We're currently setting up your personalized dashboard experience. Check back soon for your progress and updates!
                </p>
            </div>
        </div>
    );
};

export default TeacherDashboard;
