import React from 'react';
import { Outlet } from 'react-router-dom';
import TeacherNavbar from '../components/layout/TeacherNavbar';
import Footer from '../components/layout/Footer';

const TeacherPublicLayout = () => {
    return (
        <div className="app-container">
            <TeacherNavbar />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default TeacherPublicLayout;
