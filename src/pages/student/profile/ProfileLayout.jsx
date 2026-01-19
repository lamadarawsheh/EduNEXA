import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { CreditCard, Globe, Settings, UserRound } from "lucide-react";

const navItems = [
    { to: "personal", label: "Personal info", icon: UserRound },
    { to: "settings", label: "Settings", icon: Settings },
    { to: "payment", label: "Payment", icon: CreditCard },
];

const StudentProfileLayout = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-teal-700 via-teal-600 to-emerald-500">
            <div className="relative min-h-screen w-full" dir="ltr">
                <aside className="absolute left-0 top-0 h-full w-64 border-r border-black/10 bg-white/95 p-6 shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-700 text-lg font-semibold">
                            S
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-gray-800">Sarah Ahmed</div>
                            <div className="text-xs text-gray-500">Student</div>
                        </div>
                    </div>

                    <nav className="mt-6 space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.to === "personal"}
                                    className={({ isActive }) =>
                                        `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive
                                            ? "bg-teal-600 text-white shadow"
                                            : "text-gray-600 hover:bg-teal-50 hover:text-teal-700"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span
                                                className={`flex h-9 w-9 items-center justify-center rounded-full transition ${isActive
                                                    ? "bg-white/20 text-white"
                                                    : "bg-teal-50 text-teal-700 group-hover:bg-white"
                                                    }`}
                                            >
                                                <Icon className="h-4 w-4" aria-hidden="true" />
                                            </span>
                                            {item.label}
                                        </>
                                    )}
                                </NavLink>
                            );
                        })}
                    </nav>
                </aside>

                <main className="min-h-screen pl-72 pr-8 py-10">
                    <div className="mb-6 flex flex-col gap-2 text-white">
                        <h1 className="text-2xl font-semibold">Profile</h1>
                        <p className="text-sm text-white/70">Manage your personal details and preferences.</p>
                    </div>

                    <section className="max-w-5xl rounded-2xl bg-white p-6 shadow-2xl">
                        <Outlet />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default StudentProfileLayout;
