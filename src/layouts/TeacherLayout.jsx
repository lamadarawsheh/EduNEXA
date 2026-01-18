import React from 'react';
import { Outlet } from 'react-router-dom';

const TeacherLayout = () => {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <aside className="w-64 border-r border-white/5 bg-black/20 p-6 hidden md:block">
                <h3 className="text-xl font-bold mb-8 italic tracking-tight text-accent">EduCreator</h3>
                <nav className="space-y-4">
                    <TeacherNavItem label="Analytics" active />
                    <TeacherNavItem label="My Courses" />
                    <TeacherNavItem label="Create Course" />
                    <TeacherNavItem label="Payouts" />
                    <TeacherNavItem label="Messages" badge="12" />
                </nav>
            </aside>
            <main className="flex-1 overflow-y-auto">
                <header className="px-8 py-6 border-b border-white/5 bg-background/50 backdrop-blur-sm sticky top-0">
                    <h2 className="text-lg font-medium">Teacher Dashboard</h2>
                </header>
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

const TeacherNavItem = ({ label, active, badge }) => (
    <div className={`flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer transition-colors ${active ? 'bg-accent text-white' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
        <span className="font-medium text-sm">{label}</span>
        {badge && <span className="bg-accent-foreground text-accent text-[10px] px-1.5 py-0.5 rounded-full font-bold">{badge}</span>}
    </div>
);

export default TeacherLayout;
