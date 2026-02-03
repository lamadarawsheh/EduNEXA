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
      `flex items-center justify-start gap-4 px-4 py-2.5 rounded-lg cursor-pointer transition-colors ${isActive
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
    <div className="lg:hidden flex items-center">
      {/* Burger Button */}
      <button
        className="relative z-[60] flex flex-col items-center justify-center w-10 h-10 gap-1.5 focus:outline-none bg-white rounded-full shadow-sm border border-gray-100"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle menu"
        aria-expanded={open}
        type="button"
      >
        <span
          className={`w-5 h-0.5 bg-[#176D69] rounded-full transition-all duration-300 transform origin-center ${open ? "rotate-45 translate-y-[4px]" : ""
            }`}
        />
        <span
          className={`w-5 h-0.5 bg-[#176D69] rounded-full transition-all duration-300 ${open ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
        />
        <span
          className={`w-5 h-0.5 bg-[#176D69] rounded-full transition-all duration-300 transform origin-center ${open ? "-rotate-45 -translate-y-[4px]" : ""
            }`}
        />
      </button>

      {/* Backdrop Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-[#0F4C4A]/20 backdrop-blur-[2px] animate-in fade-in duration-200"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-4 z-[60] w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 animate-in slide-in-from-top-4 duration-300 origin-top-right">
          <div className="flex flex-col gap-1">
            <div className="px-4 py-2 mb-2 border-b border-gray-50">
              <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Admin Navigation</p>
            </div>

            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.to}
                  label={item.label}
                  to={item.to}
                  onClick={closeMenu}
                />
              ))}
            </nav>

            <div className="mt-4 pt-4 border-t border-gray-50">
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-between gap-2 font-bold text-sm text-red-500 hover:bg-red-50 px-4 py-3 rounded-xl transition-colors group"
                type="button"
              >
                <span className="flex items-center gap-2">
                  <PiSignOutBold size={18} />
                  <span>Sign Out</span>
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
