import React, { useEffect, useState } from 'react'
import { TbCrown } from "react-icons/tb";

import profileImage from '../../../assets/profile.jpg'
import cProgramming from '../../../assets/C-programming.jpg'
import aspProgramming from '../../../assets/asp.png'
import circle from '../../../assets/circle.svg'
import reviewboy from '../../../assets/reviewboy.svg'
import reviewgirl from '../../../assets/reviewgirl.svg'
import { useNavigate } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import { PiUsersLight, PiGlobeSimple, PiSpinnerGapThin } from 'react-icons/pi';
import { IoPlayCircle } from 'react-icons/io5';
import { FaInstagram, FaTwitter, FaWhatsapp, FaYoutube, FaFacebookF } from 'react-icons/fa6';
import { LuChevronDown } from "react-icons/lu";

import { useDispatch, useSelector } from "react-redux";
import { fetchInstructorProfile, fetchApprovedCourses, fetchReviews } from '../../../ReduxToolkit/Profile/ProfileSlice';
function Profile() {

    const dispatch = useDispatch(); // Initialize dispatch function

    const {
        data,
        courses,
        reviews,
    } = useSelector((state) => state.profile);  // Access profile data from Redux store

    useEffect(() => {
        dispatch(fetchInstructorProfile());
        dispatch(fetchApprovedCourses());
        dispatch(fetchReviews());
    }, [dispatch]);


    const [visibleReviews, setVisibleReviews] = useState(3);
    const handleLoadMore = () => {
        setVisibleReviews((prev) => prev + 3); // Load 3 more reviews each time
    };

    const navigate = useNavigate();
    const handleCourseClick = (course, id, imageIndex) => {
        navigate(`/teacher/course-analytics/${id}`, {
            state: { course, imageIndex }
        });
    };

    const reviewsImg = [
        reviewboy,
        reviewboy,
        reviewboy,
        reviewboy,
        reviewboy,
        reviewboy,
        reviewboy,
        reviewboy,
        reviewgirl,
        reviewgirl,
    ]

    const profileData = {
        badge: "Top Rated",
        rating: 4.8,
        reviews: "134,633",
        students: "430,117",
        image: profileImage
    };

    const [activeTab, setActiveTab] = useState('courses');

    const timeAgo = (dateString) => {
        const now = new Date();
        const createdAt = new Date(dateString);

        const diffInSeconds = Math.floor((now - createdAt) / 1000);

        const minutes = Math.floor(diffInSeconds / 60);
        const hours = Math.floor(diffInSeconds / 3600);
        const days = Math.floor(diffInSeconds / 86400);
        const weeks = Math.floor(diffInSeconds / 604800);

        if (diffInSeconds < 60) {
            return "just now";
        } else if (minutes < 60) {
            return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        } else if (hours < 24) {
            return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        } else if (days < 7) {
            return `${days} day${days > 1 ? "s" : ""} ago`;
        } else {
            return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
        }
    };

    const courseImages= [
        cProgramming,
        cProgramming,
        cProgramming,
        cProgramming,
        cProgramming,
        aspProgramming,
    ]

    console.log("Profile Data:", data);

    // const reviewsList = [
    //     {
    //         id: 1,
    //         name: "Guy Hawkins",
    //         date: "1 week ago",
    //         rating: 5,
    //         avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    //         text: "I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Ali."
    //     },
    //     {
    //         id: 2,
    //         name: "Dianne Russell",
    //         date: "51 mins ago",
    //         rating: 5,
    //         avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    //         text: "This course is just amazing! has great course content, the best practices, and a lot of real-world knowledge. I love the way of giving examples, the best tips by the instructor which are pretty interesting, fun and knowledgeable and I was never getting bored throughout the course. Highly recommend this course!"
    //     },
    //     {
    //         id: 3,
    //         name: "Bessie Cooper",
    //         date: "6 hours ago",
    //         rating: 5,
    //         avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    //         text: "Webflow course was good, it covers design secrets, and to build responsive web pages, blog, and some more tricks and tips about webflow. I enjoyed the course and it helped me to add web development skills related to webflow in my toolbox. Thank you Ali."
    //     },
    //     {
    //         id: 4,
    //         name: "Guy Hawkins",
    //         date: "1 week ago",
    //         rating: 5,
    //         avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    //         text: "I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Ali."
    //     },
    //     {
    //         id: 5,
    //         name: "Dianne Russell",
    //         date: "51 mins ago",
    //         rating: 5,
    //         avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    //         text: "This course is just amazing! has great course content, the best practices, and a lot of real-world knowledge. I love the way of giving examples, the best tips by the instructor which are pretty interesting, fun and knowledgeable and I was never getting bored throughout the course. Highly recommend this course!"
    //     },
    //     {
    //         id: 6,
    //         name: "Bessie Cooper",
    //         date: "6 hours ago",
    //         rating: 5,
    //         avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    //         text: "Webflow course was good, it covers design secrets, and to build responsive web pages, blog, and some more tricks and tips about webflow. I enjoyed the course and it helped me to add web development skills related to webflow in my toolbox. Thank you Ali."
    //     },
    //     {
    //         id: 7,
    //         name: "Bessie Cooper",
    //         date: "6 hours ago",
    //         rating: 5,
    //         avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    //         text: "Webflow course was good, it covers design secrets, and to build responsive web pages, blog, and some more tricks and tips about webflow. I enjoyed the course and it helped me to add web development skills related to webflow in my toolbox. Thank you Ali."
    //     },
    //     {
    //         id: 8,
    //         name: "Guy Hawkins",
    //         date: "1 week ago",
    //         rating: 5,
    //         avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    //         text: "I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Ali."
    //     },
    //     {
    //         id: 10,
    //         name: "Dianne Russell",
    //         date: "51 mins ago",
    //         rating: 5,
    //         avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    //         text: "This course is just amazing! has great course content, the best practices, and a lot of real-world knowledge. I love the way of giving examples, the best tips by the instructor which are pretty interesting, fun and knowledgeable and I was never getting bored throughout the course. Highly recommend this course!"
    //     },
    //     {
    //         id: 3,
    //         name: "Bessie Cooper",
    //         date: "6 hours ago",
    //         rating: 5,
    //         avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    //         text: "Webflow course was good, it covers design secrets, and to build responsive web pages, blog, and some more tricks and tips about webflow. I enjoyed the course and it helped me to add web development skills related to webflow in my toolbox. Thank you Ali."
    //     }
    // ];
    return (
        <div className='bg-white w-full'>
            {/* top section */}

            <div className='bg-[#F2F2F2] flex justify-between items-center lg:flex-row flex-col p-6 mb-10'>

                {/* Left section */}
                <div className='flex flex-col md:flex-row items-center gap-6 w-full lg:w-auto text-center md:text-left'>
                    <img
                        src={profileImage}
                        alt=""
                        className='w-32 h-32 md:w-40 md:h-40 lg:w-50 lg:h-50 rounded-full object-cover'
                    />

                    <div className='text-[#093332]'>
                        <div className='flex flex-col sm:flex-row sm:items-center gap-2 mb-2 justify-center md:justify-start'>
                            <h2 className='text-xl sm:text-2xl font-bold uppercase'>{data.name}</h2>
                            <span className='flex items-center bg-white px-3 py-1 gap-1 justify-center sm:justify-start'>
                                <TbCrown /> {profileData.badge}
                            </span>
                        </div>

                        <span className='block mb-3'>{data.title}</span>

                        <div className='flex flex-wrap justify-center md:justify-start gap-4 mt-4'>
                            <div className="flex items-center gap-2">
                                <div className='text-[#FD8E1F]'>
                                    <FaStar />
                                </div>
                                <span className="font-medium">4.8</span>
                                <span className="text-xs sm:text-sm">({reviews.length} review)</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-2xl"><PiUsersLight /></span>
                                <span className="font-medium">{data.students || 100}</span>
                                <span>students</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-2xl"><IoPlayCircle /></span>
                                <span className="font-medium">{data.courses?.length}</span>
                                <span>courses</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right section */}
                <div className='flex flex-col justify-center items-center lg:items-end gap-3 mt-6 lg:mt-0 w-full lg:w-auto'>
                    <a
                        href={profileData.website}
                        target="_blank"
                        className='flex items-center gap-1 text-[#564FFD] break-all'
                    >
                        <PiGlobeSimple /> {data.website}
                    </a>

                    <div className='flex gap-3 flex-wrap justify-center lg:justify-end'>
                        <a href="" className='p-3 bg-white text-[#176D69]'>{data.socials.facebook && <FaFacebookF />}</a>
                        <a href="" className='p-3 bg-white text-[#176D69]'>{data.socials.twitter && <FaTwitter />}</a>
                        <a href="" className='p-3 bg-white text-[#176D69]'>{data.socials.instagram && <FaInstagram />}</a>
                        <a href="" className='p-3 bg-white text-[#176D69]'>{data.socials.youtube && <FaYoutube />}</a>
                        <a href="" className='p-3 bg-white text-[#176D69]'>{data.socials.whatsapp && <FaWhatsapp />}</a>
                    </div>
                </div>

            </div>


            {/* about section */}
            <div className='px-8 lg:px-20 pb-10 lg:pb-20'>
                <h2 className='text-2xl font-bold mb-4 text-[#093332]'>ABOUT ME</h2>
                <div className='text-[#176D69] leading-5'>
                    <p className='mb-4'>One day Ali had enough with the 9-to-5 grind, or more like 9-to-9 in his case,
                        and quit his job, or more like got himself fired from his own startup. </p>
                    <p className='mb-4'>He decided to work on his dream: be his own boss, travel the world, only do the work he enjoyed,
                        and make a lot more money in the process. No more begging for vacation days and living
                        from paycheck to paycheck. After trying everything from e-commerce stores to professional
                        poker his lucky break came when he started freelance design. Ali fell in love with the
                        field that gives him the lifestyle of his dreams. </p>
                    <p className='mb-4'>Ali realizes that people who take courses on EduNEXA want to
                        transform their lives. Today with his courses and mentoring Ali is helping
                        thousands of people transform their lives, just like he did once. </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto min-h-screen font-sans text-[#1D2026]">


                {/* --- Tabs Section--- */}
                <div className="border-b border-gray-200 mb-8  md:px-8 ">
                    <div className="flex gap-30">
                        <button
                            onClick={() => setActiveTab('courses')}
                            className={`pb-4 px-2 font-medium transition-all relative ml-20 ${activeTab === 'courses' ? 'text-teal-700' : 'text-black'}`}
                        >
                            Courses
                            {activeTab === 'courses' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600"></div>}
                        </button>
                        <button
                            onClick={() => setActiveTab('review')}
                            className={`pb-4 px-2 font-medium transition-all relative ${activeTab === 'review' ? 'text-teal-700' : 'text-black'}`}
                        >
                            Review
                            {activeTab === 'review' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600"></div>}
                        </button>
                    </div>
                </div>

                {/* --- Dynamic Content --- */}
                {activeTab === 'courses' ? (
                    <div>
                        <h2 className="text-xl font-medium mb-6 ml-20">All Courses <span className="font-normal">(0{courses.length})</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#A6E5E3]/17 p-4 md:p-8 ">
                            {courses.map((course, id) => (
                                <div onClick={() => handleCourseClick(course, course.id, id)} key={course.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <img src={courseImages[id]} className="w-full h-44 object-cover cursor-pointer" />
                                    <div className="p-5">
                                        <div className="flex justify-between items-center mb-5">
                                            <span className="text-[10px] font-bold bg-indigo-50 text-[#342F98] px-2 py-1 rounded tracking-wider">{course.level}</span>
                                            <span className="text-[#FF6636] font-bold text-xl">${course.price}</span>
                                        </div>
                                        <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{course.description}</p>
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm">
                                            <span className="flex items-center gap-1 font-bold text-gray-500"><FaStar className="text-orange-400" /> {course.reviewCount.toFixed(1)}</span>
                                            <span className="text-gray-500"><b className="text-gray-500">{course.studentCount}</b> students</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-12 relative">

                        {/* Reviews List Section */}
                        <div className="flex-1 p-6 md:p-10">
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-2xl font-bold text-[#1D2026]">Students Feedback</h2>
                                <div className="relative group">
                                    <button className="flex items-center gap-3 border border-gray-200 px-4 py-2 rounded text-sm font-medium text-[#176D69] hover:bg-gray-50">
                                        4 Star Rating <LuChevronDown />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-10">
                                {reviews.slice(0, visibleReviews).map((review, index) => (
                                    <div key={review.id} className="flex gap-4 border-b border-gray-50 pb-10 last:border-0">
                                        <img src={reviewsImg[index]} className="w-12 h-12 rounded-full object-cover" />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className="font-bold text-[#093332]">{review.studentName}</h4>
                                                <span className="text-[10px] text-[#176D69]">• {timeAgo(review.createdAt)}</span>
                                            </div>
                                            <div className="flex text-[#FD8E1F] gap-0.5 mb-3">
                                                {[...Array(review.rating)].map((_, i) => <FaStar key={i} size={12} />)}
                                            </div>
                                            <p className="text-[#0F4C4A] text-[15px] leading-relaxed max-w-3xl">{review.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='absolute right-0 top-1/2 hidden lg:block'>
                                <img src={circle} alt="" />
                            </div>

                            {visibleReviews < reviews.length && (
                                <button
                                    onClick={handleLoadMore}
                                    className="mt-12 flex items-center gap-2 bg-[#A6E5E3]/36 text-[#176D69] px-6 py-3 rounded font-bold text-sm hover:bg-[#1E8A85] hover:text-white transition-all"
                                >
                                    Load More <PiSpinnerGapThin size={20} className="animate-spin-slow" />
                                </button>
                            )}
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile