import React, { useEffect, useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { CreditCard, Globe, Settings, UserRound, ArrowLeft } from "lucide-react";
import api from "../../../services/api";

const navItems = [
    { to: "personal", label: "Personal info", icon: UserRound },
    { to: "settings", label: "Settings", icon: Settings },
];

import {
    resolveImageUrl,
    extractProfileData,
    getStoredProfileImage,
    getStoredDisplayName
} from "../../../utils/profileUtils";

const StudentProfileLayout = () => {
    const [profileImage, setProfileImage] = useState(() => getStoredProfileImage());
    const [displayName, setDisplayName] = useState(() => getStoredDisplayName());

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/PersonalInformation');
                const profile = extractProfileData(response?.data);

                if (profile) {
                    const rawImageUrl = profile.imageUrl || profile.imageURL || profile.avatarUrl || profile.profileImage || profile.profileImageUrl || profile.avatar || '';
                    if (rawImageUrl) {
                        const resolved = resolveImageUrl(rawImageUrl);
                        setProfileImage(resolved);
                        localStorage.setItem('profileImageUrl', resolved);
                    }
                    setDisplayName(getStoredDisplayName(profile));
                }
            } catch (error) {
                console.error('ProfileLayout: Failed to fetch profile:', error);
            }
        };

        const updateState = () => {
            setProfileImage(getStoredProfileImage());
            setDisplayName(getStoredDisplayName());
        };

        fetchProfile();

        const handleStorage = (event) => {
            if (event.key === "profileImageUrl" || event.key === "user") {
                updateState();
            }
        };

        const handleProfileUpdate = (event) => {
            if (event?.detail?.url) {
                setProfileImage(resolveImageUrl(event.detail.url));
            }
        };

        window.addEventListener("storage", handleStorage);
        window.addEventListener("profile-image-updated", handleProfileUpdate);
        return () => {
            window.removeEventListener("storage", handleStorage);
            window.removeEventListener("profile-image-updated", handleProfileUpdate);
        };
    }, []);

    return (
        <div className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center bg-linear-to-br from-teal-700 via-teal-600 to-emerald-500 p-4 md:p-6">
            <div className="flex w-full max-w-5xl flex-col gap-6 md:flex-row md:items-start">

                {/* Side Menu Card */}
                <aside className="w-full shrink-0 rounded-2xl bg-white p-6 shadow-xl md:w-64">

                    <div className="mb-8 flex flex-col items-center">
                        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-teal-100 text-teal-600 shadow-sm">
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt="Student profile"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <UserRound size={40} />
                            )}
                        </div>
                        <h2 className="mt-4 text-xl font-bold text-gray-800">{displayName}</h2>
                        <p className="text-xs text-gray-500">Student Account</p>
                    </div>

                    <nav className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                                        ? "bg-teal-50 text-teal-700 shadow-sm ring-1 ring-teal-100"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                    }`
                                }
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </aside>

                {/* Main Content Card */}
                <main className="flex-1 rounded-2xl bg-white/95 p-8 shadow-xl backdrop-blur-sm min-h-[500px]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default StudentProfileLayout;
