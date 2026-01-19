import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-white text-black">
            <aside className="w-64 border-r border-white/5 bg-white p-6 hidden md:block">
                <img src="/Heading1.png" alt="Admin NEXA" className="mb-8 w-32" />
                <nav className="space-y-4">
                    <NavItem label="Dashboard" active />
                    <NavItem label="Students" />
                    <NavItem label="Teachers" />
                    <NavItem label="Courses"  />
                    <NavItem label="Settings" />
                </nav>
            </aside>
            <main className="flex-1 overflow-y-auto bg-[#F2F2F2]">
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

const NavItem = ({ label, active, badge }) => (
    <div className={`flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer transition-colors ${active ? 'bg-[#DFF6F5] text-[#176D69]' : 'text-[#8A8A8A] hover:bg-white/5 hover:text-[#176D69]'}`}>
        <span className="font-medium text-sm">{label}</span>
        {badge && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{badge}</span>}
    </div>
);

export default AdminLayout;
