import React, { useState } from 'react'
import { TbCrown } from "react-icons/tb";

import profileImage from '../../../assets/profileimage.svg'
import ux from '../../../assets/ux.svg'
import design from '../../../assets/design.svg'
import code from '../../../assets/code.svg'
import circle from '../../../assets/circle.svg'

import { FaStar } from 'react-icons/fa';
import { PiUsersLight, PiGlobeSimple, PiSpinnerGapThin } from 'react-icons/pi';
import { IoPlayCircle } from 'react-icons/io5';
import { FaInstagram, FaTwitter, FaWhatsapp, FaYoutube, FaFacebookF } from 'react-icons/fa6';
import { LuChevronDown } from "react-icons/lu";
function Profile() {
    const profileData = {
        name: "Ali Ahmed",
        title: "Ui Ux Designer & Web Designer",
        badge: "Top Rated",
        website: "https://www.Ali Ahmed .com",
        rating: 4.8,
        reviews: "134,633",
        students: "430,117",
        coursesCount: 7,
        image: profileImage
    };

    const [activeTab, setActiveTab] = useState('courses');

    const coursesData = [
        {
            id: 1,
            tag: "DEVELOPMENTS",
            price: "$57",
            title: "Ui Ux Design",
            desc: "Your Gateway to UI/UX Design, Learn How to Craft Digital Products Users Love.",
            rating: 5.0,
            students: "265.7K",
            image: ux
        },
        {
            id: 2,
            tag: "DEVELOPMENTS",
            price: "$57",
            title: "Web Development",
            desc: "Learn HTML, CSS, JavaScript and create professional websites from scratch.",
            rating: 5.0,
            students: "265.7K",
            image: code
        },
        {
            id: 3,
            tag: "DEVELOPMENTS",
            price: "$57",
            title: "Graphic Design",
            desc: "Fundamentals of design, Photoshop, and Illustrator for creative professionals.",
            rating: 5.0,
            students: "265.7K",
            image: design
        }
    ];

    const reviewsList = [
        {
            id: 1,
            name: "Guy Hawkins",
            date: "1 week ago",
            rating: 5,
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            text: "I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Ali."
        },
        {
            id: 2,
            name: "Dianne Russell",
            date: "51 mins ago",
            rating: 5,
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
            text: "This course is just amazing! has great course content, the best practices, and a lot of real-world knowledge. I love the way of giving examples, the best tips by the instructor which are pretty interesting, fun and knowledgeable and I was never getting bored throughout the course. Highly recommend this course!"
        },
        {
            id: 3,
            name: "Bessie Cooper",
            date: "6 hours ago",
            rating: 5,
            avatar: "https://randomuser.me/api/portraits/women/3.jpg",
            text: "Webflow course was good, it covers design secrets, and to build responsive web pages, blog, and some more tricks and tips about webflow. I enjoyed the course and it helped me to add web development skills related to webflow in my toolbox. Thank you Ali."
        },
        {
            id: 1,
            name: "Guy Hawkins",
            date: "1 week ago",
            rating: 5,
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            text: "I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Ali."
        },
        {
            id: 2,
            name: "Dianne Russell",
            date: "51 mins ago",
            rating: 5,
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
            text: "This course is just amazing! has great course content, the best practices, and a lot of real-world knowledge. I love the way of giving examples, the best tips by the instructor which are pretty interesting, fun and knowledgeable and I was never getting bored throughout the course. Highly recommend this course!"
        },
        {
            id: 3,
            name: "Bessie Cooper",
            date: "6 hours ago",
            rating: 5,
            avatar: "https://randomuser.me/api/portraits/women/3.jpg",
            text: "Webflow course was good, it covers design secrets, and to build responsive web pages, blog, and some more tricks and tips about webflow. I enjoyed the course and it helped me to add web development skills related to webflow in my toolbox. Thank you Ali."
        }
    ];
    return (
        <div className='bg-white w-full'>
            {/* top section */}

            <div className='bg-[#F2F2F2] flex justify-between items-center lg:flex-row flex-col p-6 mb-10'>

                {/* Left section */}
                <div className='flex flex-col md:flex-row items-center gap-6 w-full lg:w-auto text-center md:text-left'>
                    <img
                        src={profileImage}
                        alt=""
                        className='w-32 h-32 md:w-40 md:h-40 lg:w-auto lg:h-auto rounded-full md:rounded-none object-cover'
                    />

                    <div className='text-[#093332]'>
                        <div className='flex flex-col sm:flex-row sm:items-center gap-2 mb-2 justify-center md:justify-start'>
                            <h2 className='text-xl sm:text-2xl font-bold'>{profileData.name}</h2>
                            <span className='flex items-center bg-white px-3 py-1 gap-1 justify-center sm:justify-start'>
                                <TbCrown /> {profileData.badge}
                            </span>
                        </div>

                        <span className='block mb-3'>{profileData.title}</span>

                        <div className='flex flex-wrap justify-center md:justify-start gap-4 mt-4'>
                            <div className="flex items-center gap-2">
                                <div className='text-[#FD8E1F]'>
                                    <FaStar />
                                </div>
                                <span className="font-medium">4.8</span>
                                <span className="text-xs sm:text-sm">({profileData.reviews} review)</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-2xl"><PiUsersLight /></span>
                                <span className="font-medium">{profileData.students}</span>
                                <span>students</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-2xl"><IoPlayCircle /></span>
                                <span className="font-medium">{profileData.coursesCount}</span>
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
                        <PiGlobeSimple /> {profileData.website}
                    </a>

                    <div className='flex gap-3 flex-wrap justify-center lg:justify-end'>
                        <a href="" className='p-3 bg-white text-[#176D69]'><FaFacebookF /></a>
                        <a href="" className='p-3 bg-white text-[#176D69]'><FaTwitter /></a>
                        <a href="" className='p-3 bg-white text-[#176D69]'><FaInstagram /></a>
                        <a href="" className='p-3 bg-white text-[#176D69]'><FaYoutube /></a>
                        <a href="" className='p-3 bg-white text-[#176D69]'><FaWhatsapp /></a>
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
                        <h2 className="text-xl font-medium mb-6 ml-20">Ali Courses <span className="font-normal">(02)</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#A6E5E3]/17 p-4 md:p-8 ">
                            {coursesData.map((course) => (
                                <div key={course.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <img src={course.image} alt={course.title} className="w-full h-44 object-cover" />
                                    <div className="p-5">
                                        <div className="flex justify-between items-center mb-5">
                                            <span className="text-[10px] font-bold bg-indigo-50 text-[#342F98] px-2 py-1 rounded tracking-wider">{course.tag}</span>
                                            <span className="text-[#FF6636] font-bold text-xl">{course.price}</span>
                                        </div>
                                        <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{course.desc}</p>
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm">
                                            <span className="flex items-center gap-1 font-bold text-gray-500"><FaStar className="text-orange-400" /> {course.rating.toFixed(1)}</span>
                                            <span className="text-gray-500"><b className="text-gray-500">{course.students}</b> students</span>
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
                                        5 Star Rating <LuChevronDown />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-10">
                                {reviewsList.map((review) => (
                                    <div key={review.id} className="flex gap-4 border-b border-gray-50 pb-10 last:border-0">
                                        <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className="font-bold text-[#093332]">{review.name}</h4>
                                                <span className="text-[10px] text-[#176D69]">• {review.date}</span>
                                            </div>
                                            <div className="flex text-[#FD8E1F] gap-0.5 mb-3">
                                                {[...Array(5)].map((_, i) => <FaStar key={i} size={12} />)}
                                            </div>
                                            <p className="text-[#0F4C4A] text-[15px] leading-relaxed max-w-3xl">{review.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='absolute right-0 top-1/2 hidden lg:block'>
                                <img src={circle} alt="" />
                            </div>

                            <button className="mt-12 flex items-center gap-2 bg-[#A6E5E3]/36 text-[#176D69] px-6 py-3 rounded font-bold text-sm hover:bg-[#1E8A85] hover:text-white transition-all">
                                Load More <PiSpinnerGapThin size={20} className="animate-spin-slow" />
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile