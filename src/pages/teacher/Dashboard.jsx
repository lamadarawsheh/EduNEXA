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
import { getInstructorDashboard, getInstructorReviews } from '../../services/teacherDashboardService';

const TeacherDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [reviewsData, setReviewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageError, setImageError] = useState(false);
    const [liveImageUrl, setLiveImageUrl] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await getInstructorDashboard();
                setDashboardData(data);

                // Dynamically get instructor ID from state/localStorage
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                const instructorId = user.id || '';

                if (instructorId) {
                    const reviews = await getInstructorReviews(instructorId);
                    // Handle JSON.NET $values if present
                    const rawReviews = Array.isArray(reviews) ? reviews : (reviews?.$values || []);
                    setReviewsData(rawReviews);
                }

                setError(null);
            } catch (err) {
                console.error("Dashboard Fetch Error:", err);
                setError("Failed to load dashboard insights. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        const handleProfileUpdate = (event) => {
            if (event?.detail?.url) {
                setLiveImageUrl(event.detail.url);
                setImageError(false);
            }
        };

        window.addEventListener('profile-image-updated', handleProfileUpdate);
        return () => window.removeEventListener('profile-image-updated', handleProfileUpdate);
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

    // Process Reviews for Activities and Charts
    const activities = reviewsData.slice(0, 4).map(review => ({
        id: review.id,
        user: review.studentName || 'A Student',
        action: `gave a ${review.rating} star rating: "${review.comment || 'No comment'}"`,
        time: review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recent',
        icon: <Star size={14} fill="currentColor" />,
        color: 'bg-[#0F4C4A]'
    }));

    // If no reviews, use fallback activities
    if (activities.length === 0) {
        activities.push({ id: 1, user: 'EduNexa', action: 'Welcome to your new dashboard! Start by creating a course.', time: 'Now', icon: <Trophy size={14} />, color: 'bg-[#1E6B65]' });
    }

    const profileViewData = [
        { name: 'Jan', value: 400 }, { name: 'Feb', value: 300 }, { name: 'Mar', value: 600 },
        { name: 'Apr', value: 800 }, { name: 'May', value: 500 }, { name: 'Jun', value: 900 },
        { name: 'Jul', value: 400 }, { name: 'Aug', value: 700 }, { name: 'Sep', value: 500 },
    ];

    const sparklineData = [
        { v: 10 }, { v: 25 }, { v: 15 }, { v: 35 }, { v: 20 }, { v: 30 }, { v: 18 }, { v: 38 }, { v: 22 }
    ];

    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviewsData.forEach(r => {
        if (r.rating >= 1 && r.rating <= 5) ratingCounts[r.rating]++;
    });

    const totalReviews = reviewsData.length || 1;
    const ratingDistribution = [
        { stars: 5, label: '5 Star', percentage: Math.round((ratingCounts[5] / totalReviews) * 100) },
        { stars: 4, label: '4 Star', percentage: Math.round((ratingCounts[4] / totalReviews) * 100) },
        { stars: 3, label: '3 Star', percentage: Math.round((ratingCounts[3] / totalReviews) * 100) },
        { stars: 2, label: '2 Star', percentage: Math.round((ratingCounts[2] / totalReviews) * 100) },
        { stars: 1, label: '1 Star', percentage: Math.round((ratingCounts[1] / totalReviews) * 100) },
    ];

    const averageRating = reviewsData.length > 0
        ? (reviewsData.reduce((acc, r) => acc + (r.rating || 0), 0) / reviewsData.length).toFixed(1)
        : "0.0";

    const resolveImageUrl = (value) => {
        if (!value || typeof value !== 'string') return null;
        const trimmed = value.trim();
        if (!trimmed || trimmed === 'null' || trimmed === 'undefined') return null;
        if (trimmed.startsWith('blob:')) return trimmed;
        if (trimmed.includes('edunexa.runasp.net')) {
            return trimmed.replace(/https?:\/\/edunexa\.runasp\.net/, '/proxy');
        }
        if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
            return trimmed;
        }
        return `/proxy/${trimmed.replace(/^\//, "")}`;
    };

    const userFromStorage = JSON.parse(localStorage.getItem('user') || '{}');
    const finalDisplayUrl = resolveImageUrl(liveImageUrl || imageUrl || userFromStorage.imageUrl || localStorage.getItem('profileImageUrl'));

    return (
        <div className="bg-[#FFFFFF] min-h-screen p-4 md:p-8 text-[#0F172B]">
            <header className="mb-10">
                <h1 className="text-base font-bold text-[#45556C]">{getGreeting()} {firstName}</h1>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white border border-[#E9ECEF] p-4 md:p-6 rounded-none flex items-center gap-4 transition-all hover:shadow-md">
                        <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center shrink-0`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-[22px] font-bold leading-none mb-1">{stat.value}</p>
                            <p className="text-[#45556C] text-xs font-medium">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-[#1E6B65] rounded-none mb-10 md:mb-16 flex flex-col md:flex-row items-center justify-between p-6 md:p-8 text-white gap-8 md:gap-0">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 bg-white/10 flex items-center justify-center shrink-0 relative">
                        {finalDisplayUrl && !imageError ? (
                            <img
                                src={finalDisplayUrl}
                                alt="Profile"
                                className="w-full h-full object-cover relative z-10 bg-[#1E6B65]"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <User className="text-white/80" size={32} strokeWidth={1.5} />
                        )}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{fullName}</h2>
                        <p className="opacity-60 text-xs">{email}</p>
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-start lg:flex-row lg:items-center gap-3 w-full md:w-auto">
                    <span className="text-xs font-medium opacity-60">1/4 Steps</span>
                    <div className="flex items-center gap-4 w-full lg:w-auto">
                        <div className="flex-1 lg:w-56 h-3 bg-[#ffffff20] rounded-none">
                            <div
                                className="h-full bg-[#11312E]"
                                style={{ width: `${profileCompletionPercentage}%` }}
                            ></div>
                        </div>
                        <span className="text-xs font-bold text-white shrink-0">{profileCompletionPercentage}% Completed</span>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 mb-10 md:mb-16">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20">
                <div>
                    <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                        <h3 className="text-sm font-bold text-[#0F172B]">Overall Course Rating</h3>
                        <button className="flex items-center gap-1 text-[#45556C] text-xs font-bold group">
                            This week <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-12 pt-4">
                        <div className="shrink-0 text-center">
                            <p className="text-[64px] font-black text-[#0F172B] leading-none mb-4">{averageRating}</p>
                            <div className="flex justify-center gap-1 mb-2 text-[#1E6B65]">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={18}
                                        fill={star <= Math.round(averageRating) ? "currentColor" : "none"}
                                        className={star <= Math.round(averageRating) ? "" : "text-gray-200"}
                                    />
                                ))}
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

                <div className="space-y-6 md:space-y-10 pt-4">
                    {ratingDistribution.map((r, i) => (
                        <div key={i} className="flex items-center gap-4 md:gap-8">
                            <div className="flex gap-0.5 shrink-0 w-16 md:w-24 text-[#1E6B65]">
                                {[...Array(5)].map((_, idx) => (
                                    <Star key={idx} size={12} fill={idx < r.stars ? "currentColor" : "none"} className={idx < r.stars ? "" : "text-gray-100"} />
                                ))}
                            </div>
                            <span className="text-[10px] font-bold text-[#45556C] w-10 md:w-12 whitespace-nowrap">{r.label}</span>
                            <div className="flex-1 h-2 bg-[#EBF5F4] overflow-hidden">
                                <div className="h-full bg-[#1E6B65]" style={{ width: `${r.percentage === '<1' ? 1 : r.percentage}%` }}></div>
                            </div>
                            <span className="text-xs font-bold text-[#45556C] w-8 md:w-10 text-right">{r.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
