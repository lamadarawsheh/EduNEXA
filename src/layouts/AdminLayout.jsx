import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { PiSignOutBold } from "react-icons/pi";
import { logout } from '../services/authService';
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { IoBookOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiStudentLight } from "react-icons/pi";

const navItems = [
    { label: "Dashboard", to: "/admin", icon: LuLayoutDashboard },
    { label: "Students", to: "/admin/students", icon: PiStudentLight },
    { label: "Teachers", to: "/admin/teachers", icon: LiaChalkboardTeacherSolid },
    { label: "Courses", to: "/admin/courses", icon: IoBookOutline },
    { label: "Settings", to: "/admin/settings", icon: IoSettingsOutline },
];
const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    const [open, setOpen] = useState(false);
    const closeMenu = () => setOpen(false);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen text-black">
            <aside className="w-64 xl:flex lg:flex-col justify-between items-between border-r border-white/5 bg-white p-6 py-8 hidden">
                <div>
                    <img src="/favicon-removebg-preview.png" alt="Admin NEXA" className="mb-8 mt-8 w-40" />
                    <nav className="space-y-4 mt-8 pt-8">
                        {navItems.map((item) => (
                            <NavItem key={item.to} label={item.label} to={item.to} Icon={item.icon} />
                        ))}
                        <button
                            onClick={handleLogout}
                            className="flex items-center mt-6 gap-2 font-semibold text-lg text-red-600 hover:text-[#8A8A8A] mb-8"
                        >
                            <PiSignOutBold /> <span>sign out</span>
                        </button>
                    </nav>
                </div>

            </aside>
            <main className="order-2 lg:order-2 flex-1 overflow-y-auto bg-[#F2F2F2]">
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
const NavItem = ({ label, to, badge, Icon, onClick }) => (
    <NavLink
        onClick={onClick}
        to={to}
        end={to === "/admin"}
        className={({ isActive }) =>
            `flex items-center justify-start gap-4 px-4 py-2.5 rounded-lg cursor-pointer transition-colors ${isActive
                ? "bg-[#DFF6F5] text-[#176D69]"
                : "text-[#8A8A8A] hover:bg-white/5 hover:text-[#176D69]"
            }`}>
        {Icon && <Icon className="text-lg" />}
        <span className="font-medium text-sm">{label}</span>
        {badge && (
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {badge}
            </span>
        )}
    </NavLink>
);
export default AdminLayout;
