import React from 'react';

const TeacherDashboard = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Teacher Analytics</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                    <h3 className="text-lg text-white/60 mb-1">Total Students</h3>
                    <p className="text-3xl font-bold text-accent">1,240</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                    <h3 className="text-lg text-white/60 mb-1">Total Earnings</h3>
                    <p className="text-3xl font-bold text-accent">$4,520</p>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
