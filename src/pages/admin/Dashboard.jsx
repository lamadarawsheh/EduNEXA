import React, { useState } from 'react';
import Header from './components/header';
import Performance from './components/Performance';
import CourseOverview from './components/CourseOverview';




const AdminDashboard = () => {
    const [value, setValue] = useState("");

    return (
        <div className="p-0 lg:p-8 flex-col">
        <Header/>
        <div className="px-4 lg:px-0">
        <Performance/>
        <CourseOverview/>
        </div>
        </div>
    );
};

export default AdminDashboard;
