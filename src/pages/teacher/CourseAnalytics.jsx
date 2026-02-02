import React, { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { LuChevronDown } from "react-icons/lu";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { PiChartBarHorizontal, PiPlayCircleDuotone, PiUsersDuotone, PiNotepad, PiTrophyDuotone } from "react-icons/pi";
import { useLocation, useParams } from "react-router-dom";
import { fetchEarnings } from "../../ReduxToolkit/Profile/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { isWorkingUrl } from '../../services/courseService';
import { motion, AnimatePresence } from 'framer-motion';

const chartData = [70, 90, 40, 95, 50, 78, 30, 60, 55];
const overallRating = {
    fiveStar: 56,
    fourStar: 37,
    threeStar: 8,
    twoStar: 1,
    oneStar: 1
};

const data = [
    { name: '1', uv: 40 },
    { name: '2', uv: 38 },
    { name: '3', uv: 70 },
    { name: '4', uv: 38 },
    { name: '5', uv: 40 },
    { name: '6', uv: 50 },
    { name: '7', uv: 38 },
    { name: '8', uv: 60 },
    { name: '9', uv: 65 },
    { name: '10', uv: 50 },
    { name: '11', uv: 65 },
    { name: '12', uv: 60 },
    { name: '13', uv: 65 },
    { name: '14', uv: 63 },
    { name: '15', uv: 61 },
];

const CourseAnalytics = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id: courseId } = useParams();
    const location = useLocation();

    const [course, setCourse] = useState(location.state?.course || null);
    const [loading, setLoading] = useState(!location.state?.course);

    const earnings = useSelector(
        (state) => state.profile.earnings
    );


    useEffect(() => {
        dispatch(fetchEarnings());
    }, [dispatch]);
    
    const getCourseImage = (course) => {
  if (!course) return "/course_placeholder.png";

  const imagePath =
    course.image ||
    course.thumbnailUrl ||
    course.imagePath ||
    course.ThumbnailUrl;

  if (!imagePath || !isWorkingUrl(imagePath)) {
    return "/course_placeholder.png";
  }

  return imagePath.startsWith("http")
    ? imagePath
    : `http://edunexa.runasp.net/${imagePath.replace(/^\//, "")}`;
};

    // Fetch course data if not provided via location.state
    useEffect(() => {
        if (!course && courseId) {
            setLoading(true);
            api.get(`/courses/${courseId}`)
                .then(res => {
                    setCourse(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching course:", err);
                    setLoading(false);
                });
        }
    }, [courseId, course]);

    if (loading) {
        return (
            <div className="w-full bg-white p-10 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E8A85] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading course analytics...</p>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="w-full bg-white p-10 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-xl font-semibold text-gray-700 mb-2">No course data available</p>
                    <p className="text-gray-500 mb-4">Unable to load course information.</p>
                    <button
                        onClick={() => navigate('/teacher/mycourses')}
                        className="bg-[#1E8A85] text-white px-6 py-2 rounded-lg hover:bg-[#176D69] transition"
                    >
                        Back to My Courses
                    </button>
                </div>
            </div>
        );
    }

    const formattedBarData = chartData.map((val) => ({ value: val }));

    // Animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="w-full bg-white p-4 md:p-10">

            {/* Header Section */}
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-[#F2F2F2] overflow-hidden border border-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 md:p-6">

                    {/* Image Section */}
                    <div className="lg:col-span-1 h-56 bg-gray-100 overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                            <img  src={getCourseImage(course)} 
                            alt={course.title} className="w-full h-auto" />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-2 flex flex-col justify-between">

                        {/* Top Meta */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm mb-4 gap-2">
                            <div className="text-[#1E8A85]">
                                <span className="mr-5">Duration {course.estimatedDuration}</span>
                            </div>

                            <div>
                                <span className="text-gray-900 font-semibold uppercase">{course.level}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                            {course.title}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-gray-600 mb-4 text-sm md:text-base">
                            {course.description}
                        </p>

                        {/* Stats */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-600 mb-6 border-b border-gray-200 pb-4 gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-white bg-[black] text-2xl p-1"><GoPerson /></span>
                                <span className="font-medium text-[#1E8A85]">{course.studentCount || course.students || 0}</span>
                                <span className="text-[#1E8A85]">students</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 font-medium text-[#1E8A85]">
                                    <FaStar className="text-orange-400" />
                                    {typeof course.rating === 'number' ? course.rating.toFixed(1) : (parseFloat(course.rating) || 0).toFixed(1)}
                                </div>
                                <span className="text-[#1E8A85] text-xs sm:text-sm">
                                    ({course.reviewCount || 0} Reviews)
                                </span>
                            </div>
                        </div>

                        {/* Bottom Stats + Action */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

                            {/* Earnings */}
                            <div className="flex items-center">
                                <div className="border-r border-gray-200 pr-4 md:pr-6">
                                    <p className="text-xl md:text-2xl text-gray-900">${course.price}</p>
                                    <p className="text-xs md:text-sm text-[#1E8A85]">Course prices</p>
                                </div>

                                <div className="pl-4 md:pl-6">
                                    <p className="text-xl md:text-2xl text-gray-900">${earnings?.totalRevenue ?? 0}</p>
                                    <p className="text-xs md:text-sm text-[#1E8A85]">USD dollar revenue</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <button onClick={() => {
                                    navigate('/teacher/earnings');
                                }} className="flex-1 sm:flex-none bg-teal-700 hover:bg-teal-800 
                                text-white px-5 py-2 text-sm font-medium transition cursor-pointer">
                                    Withdrew Money
                                </button>
                                <button className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100">
                                    ⋮
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </motion.div >

            {/* Middle Section: Stats & Bar Chart */}
            <motion.div {...fadeInUp} className="flex flex-col lg:flex-row justify-between mt-10 mb-10 gap-10">
                {/* LEFT STATS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 w-full lg:w-1/2 gap-6">
                    <div className="flex items-center gap-3">
                        <span className="bg-[#4FB6B2] p-2 text-2xl text-black flex-shrink-0"><PiPlayCircleDuotone /></span>
                        <div className="flex flex-col">
                            <span className="text-black font-semibold">957</span>
                            <span className="text-[#176D69] text-sm">Enrolled Courses</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="bg-[#F2F2F2] p-2 text-2xl text-[#1E8A85] flex-shrink-0"><CiCreditCard1 /></span>
                        <div className="flex flex-col">
                            <span className="text-black font-semibold">${earnings?.totalRevenue ?? 0}</span>
                            <span className="text-[#176D69] text-sm">USD Total Earning</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="bg-[#A6E5E3] p-2 text-2xl text-[#1E8A85] flex-shrink-0"><PiUsersDuotone /></span>
                        <div className="flex flex-col">
                            <span className="text-black font-semibold">{course.studentCount || course.students || 0}</span>
                            <span className="text-[#176D69] text-sm">Students enrolled</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="bg-[#4FB6B2] p-2 text-2xl text-black flex-shrink-0"><PiChartBarHorizontal /></span>
                        <div className="flex flex-col">
                            <span className="text-black font-semibold">{course.level}</span>
                            <span className="text-[#176D69] text-sm">Course level</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="bg-[#1E8A85] p-2 text-2xl text-white flex-shrink-0"><PiChartBarHorizontal /></span>
                        <div className="flex flex-col">
                            <span className="text-black font-semibold">English</span>
                            <span className="text-[#176D69] text-sm">Course Language</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="bg-[#A6E5E3] p-2 text-2xl text-[#0F4C4A] flex-shrink-0"><PiNotepad /></span>
                        <div className="flex flex-col">
                            <span className="text-black font-semibold">20</span>
                            <span className="text-[#176D69] text-sm">Attach File (8 GB)</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="bg-[#176D69] p-2 text-2xl text-white flex-shrink-0"><CiClock2 /></span>
                        <div className="flex flex-col">
                            <span className="text-black font-semibold">
                                {course.estimatedDuration ? course.estimatedDuration.split(":")[0] : (course.duration || "0")}
                            </span>
                            <span className="text-[#176D69] text-sm">Hours</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="bg-[#F2F2F2] p-2 text-2xl text-[#4FB6B2] flex-shrink-0"><PiTrophyDuotone /></span>
                        <div className="flex flex-col">
                            <span className="text-black font-semibold">451,444</span>
                            <span className="text-[#176D69] text-sm">Students viewed</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT BAR CHART */}
                <div className="w-full lg:w-1/2 border border-gray-100 p-4 rounded-sm">
                    <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
                        <h3 className="text-sm font-medium text-gray-700">Profile View</h3>
                        <span className="text-sm flex items-center text-gray-500 cursor-pointer">Today <LuChevronDown className="mt-1 ml-1" /></span>
                    </div>

                    <div className="h-52 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={formattedBarData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <XAxis hide />
                                <YAxis hide domain={[0, 100]} />
                                <Bar
                                    dataKey="value"
                                    fill="#23BD33"
                                    barSize={16}
                                    radius={[2, 2, 0, 0]}
                                    background={{ fill: '#E1F7E3' }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-4">
                        <p className="text-sm font-medium text-black">${earnings?.totalRevenue ?? 0}</p>
                        <p className="text-xs text-gray-400">USD Dollar you earned.</p>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Section: Overall Rating & Progress Bars */}
            <motion.div {...fadeInUp} className="flex flex-col lg:flex-row gap-10 mb-10 justify-between items-center mt-20">
                {/* AREA CHART SECTION */}
                <div className="flex flex-col w-full lg:w-1/2">
                    <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
                        <h3 className="text-sm font-medium text-gray-700">Overall Course Rating</h3>
                        <span className="text-sm flex items-center text-gray-500 cursor-pointer">This week <LuChevronDown className="mt-1 ml-1" /></span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5 items-center">
                        <div className="flex flex-col items-center bg-[#FFF2E5] p-4 pt-5 flex-shrink-0">
                            <p className="text-4xl font-bold text-black">
                                {typeof course.rating === 'number' ? course.rating.toFixed(1) : (parseFloat(course.rating) || 0).toFixed(1)}
                            </p>
                            <div className="text-[#FD8E1F] flex items-center text-xl my-2">
                                {Array.from({ length: 4 }, (_, i) => (
                                    <FaStar key={i} />
                                ))}
                                <FaStarHalfAlt />
                            </div>
                            <h3 className="text-gray-500 text-sm">Overall Rating</h3>
                        </div>

                        <div className="w-full h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ff7300" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#ff7300" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="uv"
                                        stroke="#ff7300"
                                        fillOpacity={1}
                                        fill="url(#colorOrange)"
                                        strokeWidth={3}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* RATING PROGRESS BARS */}
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col gap-15">
                        {Object.entries(overallRating).map(([key, value]) => {
                            const starsCount =
                                key === "fiveStar" ? 5 :
                                    key === "fourStar" ? 4 :
                                        key === "threeStar" ? 3 :
                                            key === "twoStar" ? 2 : 1;

                            return (
                                <div className="flex items-center" key={key}>
                                    {/* Stars Icons */}
                                    <div className="hidden sm:flex text-[#FD8E1F] w-24">
                                        {Array.from({ length: 5 }, (_, i) =>
                                            i < starsCount ? <FaStar key={i} /> : <FaRegStar key={i} />
                                        )}
                                    </div>

                                    {/* Star Label */}
                                    <span className="w-14 sm:w-16 text-xs sm:text-sm text-gray-500">
                                        {starsCount} star{starsCount > 1 ? "s" : ""}
                                    </span>

                                    {/* Progress Bar Container */}
                                    <div className="flex-1 h-2 bg-[#E5E7EB] overflow-hidden relative">
                                        <div
                                            className="h-full bg-[#FD8E1F]"
                                            style={{ width: `${value}%` }}
                                        ></div>
                                    </div>

                                    {/* Percentage */}
                                    <span className="w-10 text-xs sm:text-sm text-black text-right">{value}%</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>

        </motion.div>
    );
};

export default CourseAnalytics;
