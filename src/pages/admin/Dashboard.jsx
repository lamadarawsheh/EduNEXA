import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">System Overview</h1>
            <div className="space-y-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                    <h3 className="text-xl font-medium mb-4">Pending Approvals</h3>
                    <div className="text-white/60 text-center py-8 border border-dashed border-white/10 rounded-lg">
                        No courses pending approval at this time.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
