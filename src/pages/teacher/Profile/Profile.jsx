import React, { useEffect, useState } from 'react'
import { TbCrown } from "react-icons/tb";
import profileImage from '../../../assets/profile.png'
import circle from '../../../assets/circle.svg'
import { useNavigate } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import { PiUsersLight, PiGlobeSimple, PiSpinnerGapThin } from 'react-icons/pi';
import { IoPlayCircle } from 'react-icons/io5';
import { FaInstagram, FaTwitter, FaWhatsapp, FaYoutube, FaFacebookF } from 'react-icons/fa6';
import { LuChevronDown } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructorProfile, fetchReviews } from '../../../ReduxToolkit/Profile/ProfileSlice';
import { BaseURL, isWorkingUrl } from '../../../services/courseService';
import { motion, AnimatePresence } from 'framer-motion';

function Profile() {
    const dispatch = useDispatch();
    const { data, reviews } = useSelector((state) => state.profile);
    const approvedCourses = (data.courses || []).filter(course => course.status === "Approved");

    useEffect(() => {
        dispatch(fetchInstructorProfile()).then((res) => {
            const instructorId = "DE2E2F10-9E91-4391-5938-08DE4AEF4B97";
            dispatch(fetchReviews(instructorId));
        });
    }, [dispatch]);

    const [visibleReviews, setVisibleReviews] = useState(3);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const handleLoadMore = () => {
        setIsLoadingMore(true);
       // Simulate loading delay
        setTimeout(() => {
            setVisibleReviews((prev) => prev + 3);
            setIsLoadingMore(false);
        }, 800);
    };

    const navigate = useNavigate();
    const handleCourseClick = (course, id, imageIndex) => {
        navigate(`/teacher/course-analytics/${id}`, {
            state: { course, imageIndex }
        });
    };

    const profileData = {
        badge: "Top Rated",
        rating: 4.8,
        reviews: "134,633",
        students: "430,117",
        image: profileImage
    };

    const [activeTab, setActiveTab] = useState('courses');

    const timeAgo = (dateString) => {
        if (!dateString) return "";
        const now = new Date();
        const createdAt = new Date(dateString);
        const diffInSeconds = Math.floor((now - createdAt) / 1000);
        const minutes = Math.floor(diffInSeconds / 60);
        const hours = Math.floor(diffInSeconds / 3600);
        const days = Math.floor(diffInSeconds / 86400);
        const weeks = Math.floor(diffInSeconds / 604800);

        if (diffInSeconds < 60) return "just now";
        else if (minutes < 60) return `${minutes}m ago`;
        else if (hours < 24) return `${hours}h ago`;
        else if (days < 7) return `${days}d ago`;
        else return `${weeks}w ago`;
    };

    // إعدادات الانيميشن للعناصر
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className='bg-white w-full'
        >
            {/* Header section */}
            <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className='bg-[#F2F2F2] flex justify-between items-center lg:flex-row flex-col p-6 mb-10 shadow-sm'
            >
                <div className='flex flex-col md:flex-row items-center gap-6 w-full lg:w-auto text-center md:text-left'>
                    <div className="relative shrink-0">
                        <img
                            src={data.image ? (data.image.startsWith('http') ? data.image : `http://edunexa.runasp.net/${data.image.replace(/^\//, '')}`) : profileImage}
                            alt={data.name}
                            className='w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full object-cover border-4 border-white shadow-xl transition-transform duration-500 hover:scale-105'
                            onError={(e) => { e.target.src = profileImage; }}
                        />
                    </div>

                    <div className='text-[#093332]'>
                        <div className='flex flex-col sm:flex-row sm:items-center gap-2 mb-2 justify-center md:justify-start'>
                            <h2 className='text-xl sm:text-2xl font-bold uppercase tracking-tight'>{data.name}</h2>
                            <span className='flex items-center bg-white px-3 py-1 gap-1 justify-center sm:justify-start rounded-full text-sm shadow-sm'>
                                <TbCrown className="text-yellow-500" /> {profileData.badge}
                            </span>
                        </div>
                        <span className='block mb-3 opacity-80'>{data.title}</span>
                        
                        <div className='flex flex-wrap justify-center md:justify-start gap-4 mt-4'>
                            <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-lg">
                                <FaStar className='text-[#FD8E1F]' />
                                <span className="font-medium">4.8</span>
                                <span className="text-xs text-gray-500">({profileData.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <PiUsersLight className="text-xl" />
                                <span className="font-medium">{profileData.students}</span>
                                <span className="text-sm text-gray-500">students</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <IoPlayCircle className="text-xl" />
                                <span className="font-medium">{approvedCourses.length}</span>
                                <span className="text-sm text-gray-500">courses</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col justify-center items-center lg:items-end gap-3 mt-6 lg:mt-0'>
                    <a href={data.website} target="_blank" className='flex items-center gap-1 text-[#564FFD] hover:underline transition-all'>
                        <PiGlobeSimple /> {data.website || "No Website"}
                    </a>
                    <div className='flex gap-3'>
                        {[
                            { icon: <FaFacebookF />, link: data.socials?.facebook },
                            { icon: <FaTwitter />, link: data.socials?.twitter },
                            { icon: <FaInstagram />, link: data.socials?.instagram },
                            { icon: <FaYoutube />, link: data.socials?.youtube },
                            { icon: <FaWhatsapp />, link: data.socials?.whatsapp, isWa: true },
                        ].map((social, i) => social.link && (
                            <motion.a 
                                whileHover={{ y: -3 }}
                                key={i} 
                                href={social.isWa ? `https://wa.me/${social.link}` : social.link} 
                                className='p-3 bg-white text-[#176D69] rounded-lg shadow-sm hover:bg-[#176D69] hover:text-white transition-colors'
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* About section */}
            <motion.div {...fadeInUp} className='px-8 lg:px-20 pb-10'>
                <h2 className='text-2xl font-bold mb-4 text-[#093332]'>ABOUT ME</h2>
                <p className='text-[#176D69] leading-relaxed max-w-4xl'>
                    EduNEXA Instructor focusing on delivering high-quality educational content and helping students achieve their professional goals.
                </p>
            </motion.div>

            <div className="max-w-6xl mx-auto min-h-screen font-sans">
                {/* Tabs */}
                <div className="border-b border-gray-100 mb-8 px-4 md:px-8">
                    <div className="flex gap-12 justify-center md:justify-start">
                        {['courses', 'review'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 px-2 font-medium capitalize transition-all relative ${activeTab === tab ? 'text-[#176D69]' : 'text-gray-400'}`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-[#176D69]" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'courses' ? (
                        <motion.div 
                            key="courses"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="px-6 md:px-12"
                        >
                            <h2 className="text-xl font-medium mb-6 text-black">Approved Courses <span className="text-gray-400">({approvedCourses.length})</span></h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {approvedCourses.map((course, index) => (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleCourseClick(course, course.id, index)} 
                                        key={course.id} 
                                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col h-full border border-gray-50"
                                    >
                                        
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={(course.thumbnailUrl && isWorkingUrl(course.thumbnailUrl)) ? (course.thumbnailUrl.startsWith('http') ? course.thumbnailUrl : `http://edunexa.runasp.net/${course.thumbnailUrl.replace(/^\//, '')}`) : "/course_placeholder.png"}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                                onError={(e) => { e.target.src = "/course_placeholder.png"; }}
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                                        </div>
                                        <div className="p-5 flex flex-col flex-1">
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="text-[10px] font-bold bg-indigo-50 text-[#342F98] px-2 py-1 rounded-md uppercase">{course.level || "Beginner"}</span>
                                                <span className="text-[#FF6636] font-bold text-lg">${course.price || 0}</span>
                                            </div>
                                            <h3 className="font-bold text-lg mb-2 text-black group-hover:text-[#176D69] transition-colors">{course.title}</h3>
                                            <p className="text-gray-500 text-sm line-clamp-2 mb-4">{course.description || "No description available."}</p>
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-sm mt-auto">
                                                <span className="flex items-center gap-1 font-bold text-gray-600">
                                                    <FaStar className="text-orange-400" />
                                                    {(course.rating || 0).toFixed(1)}
                                                </span>
                                                <span className="text-gray-400"><b>{course.studentCount || 0}</b> students</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="reviews"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="p-6 md:p-10"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-2xl font-bold text-black">Students Feedback</h2>
                                <button className="flex items-center gap-3 border text-[#1E8A85] border-gray-100 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all">
                                    Most Recent <LuChevronDown />
                                </button>
                            </div>

                            <div className="space-y-8 relative">
                                <AnimatePresence>
                                    {reviews.slice(0, visibleReviews).map((review, idx) => (
                                        <motion.div 
                                            key={review.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="flex gap-5 border-b border-gray-50 pb-8 last:border-0"
                                        >
                                            <img src={review.avatar} className="w-14 h-14 rounded-full border-2 border-white shadow-sm object-cover" />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h4 className="font-bold text-[#093332]">{review.name}</h4>
                                                    <span className="text-xs text-gray-400">{timeAgo(review.createdAt)}</span>
                                                </div>
                                                <div className="flex text-[#FD8E1F] gap-0.5 mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar key={i} size={12} className={i < review.rating ? "text-[#FD8E1F]" : "text-gray-200"} />
                                                    ))}
                                                </div>
                                                <p className="text-gray-600 leading-relaxed text-[15px]">{review.comment}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {visibleReviews < reviews.length && (
                                    <div className="flex justify-center mt-10">
                                        <button
                                            onClick={handleLoadMore}
                                            disabled={isLoadingMore}
                                            className="flex items-center gap-3 bg-[#176D69]/10 text-[#176D69] px-8 py-3 rounded-full font-bold text-sm hover:bg-[#176D69] hover:text-white transition-all disabled:opacity-50"
                                        >
                                            {isLoadingMore ? "Loading..." : "Show More Reviews"}
                                            <PiSpinnerGapThin className={`text-xl ${isLoadingMore ? "animate-spin" : ""}`} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

export default Profile;