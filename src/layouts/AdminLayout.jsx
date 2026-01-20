import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { PiSignOutBold } from "react-icons/pi";

const navItems = [
    { label: "Dashboard", to: "/admin" },
    { label: "Students", to: "/admin/students" },
    { label: "Teachers", to: "/admin/teachers" },
    { label: "Courses", to: "/admin/courses" },
    { label: "Settings", to: "/admin/settings" },
    ];
const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-white text-black">
        <aside className="w-64 md:flex md:flex-col justify-between items-between border-r border-white/5 bg-white p-6 py-8 hidden">
            <div>
            <img src="/Heading1.png" alt="Admin NEXA" className="mb-8 mt-8 w-32" />                
            <nav className="space-y-4 mt-8 pt-8">
            {navItems.map((item) => (
            <NavItem key={item.to} label={item.label} to={item.to} />
            ))}
            </nav>
            </div>
            <div>
            <button className="flex items-center gap-2 font-semibold text-lg text-red-600 hover:text-[#8A8A8A] mb-8">
            <PiSignOutBold /> <span>sign out</span>
            </button>
            </div>
        </aside>
        <main className="flex-1 overflow-y-auto bg-[#F2F2F2]">
            <div className="max-w-6xl mx-auto">
            <Outlet />
            </div>
        </main>
        </div>
    );
    };
    const NavItem = ({ label, to, badge }) => (
        <NavLink
            to={to}
            end={to === "/admin"}  
            className={({ isActive }) =>
            `flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer transition-colors ${
            isActive
            ? "bg-[#DFF6F5] text-[#176D69]"
            : "text-[#8A8A8A] hover:bg-white/5 hover:text-[#176D69]"
        }`}>
        <span className="font-medium text-sm">{label}</span>
        {badge && (
        <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
        {badge}
        </span>
        )}
        </NavLink>
    );
export default AdminLayout;
