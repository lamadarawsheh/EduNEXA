import React, { useState } from 'react';
import Header from './components/header';
import Performance from './components/Performance';
import CourseOverview from './components/CourseOverview';




const AdminDashboard = () => {
    const [value, setValue] = useState("");

    return (
        <div className="p-8 flex-col">
        <Header/>
        <Performance/>
        <CourseOverview/>
        </div>
    );
};

export default AdminDashboard;
