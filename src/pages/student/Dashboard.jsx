import React from 'react';

const StudentDashboard = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                    <h3 className="text-xl font-medium mb-2">My Courses</h3>
                    <p className="text-white/60">Resume your learning journey.</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                    <h3 className="text-xl font-medium mb-2">Favorites</h3>
                    <p className="text-white/60">Courses you've saved for later.</p>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
