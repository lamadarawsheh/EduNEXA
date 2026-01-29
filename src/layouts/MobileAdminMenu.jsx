import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PiSignOutBold } from "react-icons/pi";
import { logout } from "../services/authService";

const navItems = [
  { label: "Dashboard", to: "/admin" },
  { label: "Students", to: "/admin/students" },
  { label: "Teachers", to: "/admin/teachers" },
  { label: "Courses", to: "/admin/courses" },
  { label: "Settings", to: "/admin/settings" },
];

const NavItem = ({ label, to, onClick }) => (
  <NavLink
    to={to}
    end={to === "/admin"}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center justify-start gap-4 px-4 py-2.5 rounded-lg cursor-pointer transition-colors ${
        isActive
          ? "bg-[#DFF6F5] text-[#176D69]"
          : "text-[#8A8A8A] hover:bg-white/5 hover:text-[#176D69]"
      }`
    }
  >
    <span className="font-medium text-sm">{label}</span>
  </NavLink>
);

export default function MobileAdminMenu() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const closeMenu = () => setOpen(false);
    const handleLogout = () => {
    logout();
    navigate("/login");
    };

    return (
    <div className="relative lg:hidden">
        <button
        className="md:hidden flex flex-col gap-1 bg-gray-400 p-2 rounded"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle menu"
        aria-expanded={open}
        type="button"
        >
        <span
        className={`w-6 h-0.5 bg-white transition-transform duration-200 ${
            open ? "rotate-45 translate-y-2" : ""
        }`}
        />
        <span
        className={`w-6 h-0.5 bg-white transition-opacity duration-200 ${
            open ? "opacity-0" : "opacity-100"
        }`}
        />
        <span
        className={`w-6 h-0.5 bg-white transition-transform duration-200 ${
            open ? "-rotate-45 -translate-y-2" : ""
        }`}
        />
        </button>

        {open && (
        <div className="absolute right-8 top-10 z-50 w-100 bg-white rounded-2xl shadow-md p-3">
            <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
            <NavItem
                key={item.to}
                label={item.label}
                to={item.to}
                onClick={closeMenu}
            />
            ))}

            <button
            onClick={handleLogout}
            className="flex items-center gap-2 font-semibold text-lg text-red-600 hover:text-[#8A8A8A] mt-2 px-4 py-2"
            type="button"
            >
            <PiSignOutBold /> <span>sign out</span>
            </button>
            </nav>
        </div>
        )}
    </div>
    );
}
