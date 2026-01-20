import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from "../components/layout/DashboardNavbar";
import Footer from "../components/layout/Footer";

const TeacherLayout = () => {
    return (
        <div className="relative min-h-screen flex flex-col">
            <DashboardNavbar role="teacher" />
            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TeacherLayout;
