import React, { useState } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { TbClockHour4 } from "react-icons/tb";
import { MdOutlineDateRange } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { CiClock1 } from "react-icons/ci";

import Avatar from './Avatar';

const courses = [
  { title: "ًWeb Development", instructor: "Dr. Sarah Mohamed", status: "Active", statusBg: "bg-green-200", students: 85, durationWeeks: 16, startDate: "12/12/2025", rating: 5, },
  { title: "ًWeb Development", instructor: "Dr. Sarah Mohamed", status: "Active", statusBg: "bg-green-200", students: 85, durationWeeks: 16, startDate: "12/12/2025", rating: 5, },
  { title: "ًWeb Development", instructor: "Dr. Sarah Mohamed", status: "Active", statusBg: "bg-green-200", students: 85, durationWeeks: 16, startDate: "12/12/2025", rating: 5, },  
  { title: "ًWeb Development", instructor: "Dr. Sarah Mohamed", status: "Active", statusBg: "bg-green-200", students: 85, durationWeeks: 16, startDate: "12/12/2025", rating: 5, },
  { title: "ًWeb Development", instructor: "Dr. Sarah Mohamed", status: "Active", statusBg: "bg-green-200", students: 85, durationWeeks: 16, startDate: "12/12/2025", rating: 5, }
];

const recentActivities = [
  { name: "New Course Review", instructor: "Ahmed Hassan", course:"Machine Learning for review", since:"5 minutes ago" },
  { name: "New Course Review", instructor: "Ahmed Hassan", course:"Machine Learning for review", since:"5 minutes ago" },
  { name: "New Course Review", instructor: "Ahmed Hassan", course:"Machine Learning for review", since:"5 minutes ago" },
  { name: "New Course Review", instructor: "Ahmed Hassan", course:"Machine Learning for review", since:"5 minutes ago" },
  { name: "New Course Review", instructor: "Ahmed Hassan", course:"Machine Learning for review", since:"5 minutes ago" },
  { name: "New Course Review", instructor: "Ahmed Hassan", course:"Machine Learning for review", since:"5 minutes ago" },

]



export default function CourseOverview() {
  const [showAll, setShowAll] = useState(false);
  const shownActivities = showAll ? recentActivities : recentActivities.slice(0, 4);
  
  const [showAllCourses, setShowAllCourses] = useState(false);
  const shownCourses = showAllCourses ? courses : courses.slice(0, 2);

return (
    <div className="flex flex-wrap justify-between gap-2 lg:gap-0 mt-8">
    <div className="rounded-xl border border-gray-200 bg-white p-4 w-[100%] lg:w-[49%]">
      <div className='flex justify-between items-center mb-6'>
        <h2 className="text-md font-medium">Course Overview</h2>
        {!showAllCourses && ( 
        <button
        onClick={() => setShowAllCourses(true)}
        className="flex justify-between items-center bg-gray-200 rounded-md p-1 text-[12px]">
        View all
        <FaArrowRightLong className="text-sm ms-1" />
        </button>
      )}
      </div> 

      {shownCourses.map((course, index) => (
        <div
        key={index}
        className="shadow-md mb-4 pt-4 pb-2 px-4 rounded-lg border border-gray-200">
        <div className="flex flex-col gap-2 mb-6">
        <div className="flex justify-between items-center">
        <h4 className="text-md font-semibold">{course.title}</h4>
        <div className="flex items-center gap-1">
        <span className={`rounded-md text-[12px] p-1 ${course.statusBg}`}>
        {course.status}
        </span>
        <BsThreeDotsVertical className="text-gray-600" />
        </div>
        </div>
        <h4 className="text-sm text-gray-600 mb-4">{course.instructor}</h4>
        <div className="flex gap-4">
        <div className="me-2 flex gap-2">
        <FiUsers />
        <span className="text-sm text-gray-600">
        {course.students} Students
        </span>
        </div>
        <div className="me-2 flex gap-2">
        <TbClockHour4 />
        <span className="text-sm text-gray-600">
        {course.durationWeeks} Weeks
        </span>
        </div>
        </div>
        <div className="flex gap-4">
        <div className="me-2 flex gap-2 items-center">
        <MdOutlineDateRange />
        <span className="text-sm text-gray-600">{course.startDate}</span>
        </div>
        <div className="me-2 flex gap-2 items-center">
        <CiStar />
        <span className="text-sm text-gray-600">{course.rating}</span>
        </div>
        </div>
        </div>
        </div>
      ))}

      {showAllCourses && (
        <button
        onClick={() => setShowAllCourses(false)}
        className="flex justify-center items-center mt-5 w-full rounded-lg border border-gray-200 bg-gray-50 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-100">
        View less<FaArrowRightLong className="text-sm ms-2" />
        </button>
      )} 
    </div>     

    <div className="rounded-xl border border-gray-200 bg-white p-4 w-[100%] lg:w-[49%]">
      <div className="flex items-center justify-between">
        <h2 className="text-md font-medium">Recent Activities</h2>   
      </div>
      <div className="mt-4 flex flex-col gap-4">
      {shownActivities.map((item, index) => (
          <div key={index} className="flex justify-between items-start gap-4">
            <div className='flex justify-start items-start gap-4'>
              <Avatar name={item.instructor} size={40} />
            <div className="flex flex-col">
                <p className="text-gray-800 font-medium">{item.name}</p>
                <p className="text-[12px] text-gray-500">{item.instructor}</p>
                <p className="text-[12px] text-gray-500">{item.course}</p>
                <p className="text-[12px] text-gray-400 whitespace-nowrap">{item.since}</p>
            </div>
            </div>
            <div className="flex flex-col ">
            <p className='flex justify-between  items-center bg-[#FEF9C3] rounded-md p-1 text-[12px]'><CiClock1 className='text-sm me-1' /> Needs Review </p>
            <p className='flex  items-center justify-end rounded-md p-1 text-[12px]'> Review <FaArrowRightLong className='text-sm ms-1' /></p>
            </div>
          </div>
      ))}
      </div>
      {recentActivities.length > 4 && (
      <button
      onClick={() => setShowAll(!showAll)}
      className="mt-5 w-full rounded-lg border border-gray-200 bg-gray-50 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-100">
      {showAll ? "Show less" : "Show all activities"}
      </button>
      )}
    </div>
    </div>
  )
}