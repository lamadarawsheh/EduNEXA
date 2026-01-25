import React, { useEffect, useState } from 'react';
import {
    PlayCircle,
    BookOpen,
    Users,
    Trophy,
    User,
    Video,
    CreditCard,
    Layers,
    MessageSquare,
    Star,
    ArrowDown,
    ChevronDown,
    Layout,
    Loader2
} from 'lucide-react';
import {
    BarChart,
    Bar,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts';
import { getInstructorDashboard } from '../../services/teacherDashboardService';

const TeacherDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setIsLoading(true);
                const data = await getInstructorDashboard();
                setDashboardData(data);
                setError(null);
            } catch (err) {
                console.error("Dashboard Fetch Error:", err);
                setError("Failed to load dashboard statistics. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#1E6B65]">
                <Loader2 className="w-12 h-12 animate-spin mb-4" />
                <p className="font-bold">Fetching dashboard insights...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-500 p-6 text-center">
                <p className="font-bold text-lg mb-2">Notice</p>
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-6 py-2 bg-[#1E6B65] text-white rounded-lg font-bold hover:bg-[#154d4a] transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    // De-structure API Data
    const {
        fullName = "Instructor",
        email = "",
        imageUrl = "",
        profileCompletionPercentage = 0,
        enrolledCoursesCount = 0,
        activeCoursesCount = 0,
        completedCoursesCount = 0,
        totalStudents = 0,
        onlineCoursesCount = 0,
        totalEarnings = 0,
        coursesSold = 0
    } = dashboardData || {};

    const firstName = fullName.split(' ')[0];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const stats = [
        { label: 'Enrolled Courses', value: enrolledCoursesCount, icon: <PlayCircle size={28} className="text-[#1E6B65]" />, bg: 'bg-[#EBF5F4]' },
        { label: 'Active Courses', value: activeCoursesCount, icon: <BookOpen size={28} className="text-[#1E6B65]" />, bg: 'bg-[#F2F4F7]' },
        { label: 'Course Instructors', value: '150', icon: <Users size={28} className="text-[#1E6B65]" />, bg: 'bg-[#EBF5F4]' }, // Mocked or static
        { label: 'Completed Courses', value: completedCoursesCount, icon: <Trophy size={28} className="text-[#0F172B]" />, bg: 'bg-[#F2F4F7]' },
        { label: 'Students', value: totalStudents, icon: <User size={28} className="text-[#1E6B65]" />, bg: 'bg-[#EBF5F4]' },
        { label: 'Online Courses', value: onlineCoursesCount, icon: <Video size={28} className="text-[#1E6B65]" />, bg: 'bg-[#EBF5F4]' },
        { label: 'USD Total Earning', value: totalEarnings, icon: <CreditCard size={28} className="text-[#1E6B65]" />, bg: 'bg-[#EBF5F4]' },
        { label: 'Course Sold', value: coursesSold, icon: <Layout size={28} className="text-[#1E6B65]" />, bg: 'bg-[#F2F4F7]' },
    ];

    const activities = [
        { id: 1, user: 'Kevin', action: 'comments on your lecture "What is ux" in "2021 ui/ux design with figma"', time: 'Just now', icon: <MessageSquare size={14} />, color: 'bg-[#1E6B65]' },
        { id: 2, user: 'John', action: 'give a 5 star rating on your course "2021 ui/ux design with figma"', time: '5 mins ago', icon: <Star size={14} fill="currentColor" />, color: 'bg-[#0F4C4A]' },
        { id: 3, user: 'Sraboni', action: 'purchase your course "2021 ui/ux design with figma"', time: '6 mins ago', icon: <Layout size={14} />, color: 'bg-[#1E6B65]' },
        { id: 4, user: 'Arif', action: 'purchase your course "2021 ui/ux design with figma"', time: '12 mins ago', icon: <Layout size={14} />, color: 'bg-[#1E6B65]' },
    ];

    const profileViewData = [
        { name: 'Jan', value: 400 }, { name: 'Feb', value: 300 }, { name: 'Mar', value: 600 },
        { name: 'Apr', value: 800 }, { name: 'May', value: 500 }, { name: 'Jun', value: 900 },
        { name: 'Jul', value: 400 }, { name: 'Aug', value: 700 }, { name: 'Sep', value: 500 },
    ];

    const sparklineData = [
        { v: 10 }, { v: 25 }, { v: 15 }, { v: 35 }, { v: 20 }, { v: 30 }, { v: 18 }, { v: 38 }, { v: 22 }
    ];

    const ratingDistribution = [
        { stars: 5, label: '5 Star', percentage: 56 },
        { stars: 4, label: '4 Star', percentage: 37 },
        { stars: 3, label: '3 Star', percentage: 8 },
        { stars: 2, label: '2 Star', percentage: 1 },
        { stars: 1, label: '1 Star', percentage: '<1' },
    ];

    const fullImageUrl = imageUrl ? `http://edunexa.runasp.net${imageUrl}` : "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop";

    return (
        <div className="bg-[#FFFFFF] min-h-screen p-8 text-[#0F172B]">
            <header className="mb-10">
                <h1 className="text-base font-bold text-[#45556C]">{getGreeting()} {firstName}</h1>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12 mb-16 px-2">
                {stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-6">
                        <div className={`w-14 h-14 ${stat.bg} rounded-none flex items-center justify-center`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-[22px] font-bold leading-none mb-1">{stat.value}</p>
                            <p className="text-[#45556C] text-xs font-medium">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-[#1E6B65] rounded-none mb-16 flex flex-col md:flex-row items-center justify-between p-8 text-white">
                <div className="flex items-center gap-5">
                    <img
                        src={fullImageUrl}
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop"; }}
                    />
                    <div>
                        <h2 className="text-xl font-bold">{fullName}</h2>
                        <p className="opacity-60 text-xs">{email}</p>
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-center gap-3 mt-6 md:mt-0 lg:flex-row lg:gap-10">
                    <span className="text-xs font-medium opacity-60">1/4 Steps</span>
                    <div className="flex items-center gap-4">
                        <div className="w-56 h-3 bg-[#ffffff20] rounded-none">
                            <div
                                className="h-full bg-[#11312E]"
                                style={{ width: `${profileCompletionPercentage}%` }}
                            ></div>
                        </div>
                        <span className="text-xs font-bold text-white">{profileCompletionPercentage}% Completed</span>
                    </div>
                </div>

                <div className="flex gap-3 mt-6 md:mt-0">
                    <button className="bg-white/20 hover:bg-white/30 px-5 py-2.5 text-xs font-bold transition-all">
                        Edit Biography
                    </button>
                    <button className="bg-white/20 hover:bg-white/30 p-2.5 transition-all">
                        <ArrowDown size={14} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-16">
                <div>
                    <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                        <h3 className="text-sm font-bold text-[#0F172B]">Recent Activity</h3>
                        <button className="flex items-center gap-1 text-[#45556C] text-xs font-bold group">
                            Today <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                    <div className="space-y-10">
                        {activities.map((act) => (
                            <div key={act.id} className="flex gap-4 items-start">
                                <div className={`w-8 h-8 rounded-full ${act.color} text-white flex items-center justify-center shrink-0`}>
                                    {act.icon}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs leading-relaxed text-[#45556C]">
                                        <span className="font-bold text-[#0F172B]">{act.user}</span> {act.action}
                                    </p>
                                    <p className="text-[10px] text-[#1E6B65] font-bold uppercase">{act.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                        <h3 className="text-sm font-bold text-[#0F172B]">Profile View</h3>
                        <button className="flex items-center gap-1 text-[#45556C] text-xs font-bold group">
                            Today <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={profileViewData}>
                                <Bar
                                    dataKey="value"
                                    fill="#1E6B65"
                                    barSize={12}
                                    background={{ fill: '#EBF5F4' }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                    <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                        <h3 className="text-sm font-bold text-[#0F172B]">Overall Course Rating</h3>
                        <button className="flex items-center gap-1 text-[#45556C] text-xs font-bold group">
                            This week <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                    <div className="flex items-end gap-12 pt-4">
                        <div className="shrink-0 text-center">
                            <p className="text-[64px] font-black text-[#0F172B] leading-none mb-4">4.6</p>
                            <div className="flex justify-center gap-1 mb-2 text-[#1E6B65]">
                                <Star size={18} fill="currentColor" />
                                <Star size={18} fill="currentColor" />
                                <Star size={18} fill="currentColor" />
                                <Star size={18} fill="currentColor" />
                                <Star size={18} />
                            </div>
                            <p className="text-[10px] font-bold text-[#45556C] uppercase tracking-wider">Overall Rating</p>
                        </div>
                        <div className="flex-1 h-20">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={sparklineData}>
                                    <Line type="monotone" dataKey="v" stroke="#1E6B65" strokeWidth={3} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="space-y-10 pt-4">
                    {ratingDistribution.map((r, i) => (
                        <div key={i} className="flex items-center gap-8">
                            <div className="flex gap-0.5 shrink-0 w-24 text-[#1E6B65]">
                                {[...Array(5)].map((_, idx) => (
                                    <Star key={idx} size={14} fill={idx < r.stars ? "currentColor" : "none"} className={idx < r.stars ? "" : "text-gray-100"} />
                                ))}
                            </div>
                            <span className="text-[10px] font-bold text-[#45556C] w-12">{r.label}</span>
                            <div className="flex-1 h-2 bg-[#EBF5F4] overflow-hidden">
                                <div className="h-full bg-[#1E6B65]" style={{ width: `${r.percentage === '<1' ? 1 : r.percentage}%` }}></div>
                            </div>
                            <span className="text-xs font-bold text-[#45556C] w-10 text-right">{r.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
