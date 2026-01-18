import React from 'react';
import { Outlet } from 'react-router-dom';

const TeacherLayout = () => {
    return (
        <div className="teacher-container" style={{ display: 'flex' }}>
            <aside className="teacher-sidebar" style={{ width: '250px', background: '#eef2f3', minHeight: '100vh' }}>
                <nav style={{ padding: '20px' }}>
                    <h3>Teacher Tools</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li>Dashboard</li>
                        <li>Create Course</li>
                        <li>Earnings</li>
                        <li>Messages</li>
                    </ul>
                </nav>
            </aside>
            <main className="teacher-content" style={{ flex: 1, padding: '20px' }}>
                <header style={{ marginBottom: '20px', borderBottom: '1px solid #ddd' }}>Teacher Dashboard</header>
                <Outlet />
            </main>
        </div>
    );
};

export default TeacherLayout;
