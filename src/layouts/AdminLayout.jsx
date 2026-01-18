import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className="admin-container" style={{ display: 'flex' }}>
            <aside className="admin-sidebar" style={{ width: '250px', background: '#f4f4f4', minHeight: '100vh' }}>
                <nav style={{ padding: '20px' }}>
                    <h3>Admin Panel</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li>Users</li>
                        <li>Approvals</li>
                        <li>Settings</li>
                    </ul>
                </nav>
            </aside>
            <main className="admin-content" style={{ flex: 1, padding: '20px' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
