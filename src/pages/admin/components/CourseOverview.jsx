import React, { useState } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { TbClockHour4 } from "react-icons/tb";
import { MdOutlineDateRange } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { CiClock1 } from "react-icons/ci";

import Avatar from './Avatar';
import { useNavigate } from 'react-router-dom';

export default function CourseOverview({ acceptedCourses, pendingCourses }) {
  const [showAll, setShowAll] = useState(false);
  const shownActivities = showAll ? pendingCourses : pendingCourses.slice(0, 4);
  const navigate = useNavigate();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const shownCourses = showAllCourses ? acceptedCourses : acceptedCourses.slice(0, 2);

  return (
    <div className="flex flex-wrap justify-between gap-2 lg:gap-0 mt-8">
      <div className="rounded-xl border border-gray-200 bg-white p-4 w-[100%] lg:w-[49%]">
        <div className='flex justify-between items-center mb-6'>
          <h2 className="text-md font-medium">Course Overview</h2>
          {!showAllCourses && (
            <button
              onClick={() => setShowAllCourses(true)}
              className="flex justify-between items-center bg-gray-200 rounded-md p-1 text-[12px] cursor-pointer">
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
                  <span className={`rounded-md text-[12px] p-1 bg-green-200`}>
                    {course.status}
                  </span>
                  <BsThreeDotsVertical className="text-gray-600" />
                </div>
              </div>
              <h4 className="text-sm text-gray-600 mb-4">{course.instructorName}</h4>
              <div className="flex gap-4">
                <div className="me-2 flex gap-2">
                  <FiUsers />
                  <span className="text-sm text-gray-600">
                    {course.studentsCount} Students
                  </span>
                </div>
                <div className="me-2 flex gap-2">
                  <TbClockHour4 />
                  <span className="text-sm text-gray-600">
                    ${course.estimatedDuration} hours                  
                    </span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="me-2 flex gap-2 items-center">
                  <MdOutlineDateRange />
                  <span className="text-sm text-gray-600">{course.createdAt.split("T")[0]}</span>
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
            className="flex justify-center items-center mt-5 cursor-pointer w-full rounded-lg border border-gray-200 bg-gray-50 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-100">
            View less<FaArrowRightLong className="text-sm ms-2" />
          </button>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 w-[100%] lg:w-[49%]">
        <div className="flex items-center justify-between">
          <h2 className="text-md font-medium">Recent Activities</h2>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {shownActivities.map((course, index) => (
            <div key={index} className="flex justify-between items-start gap-4">
              <div className='flex justify-start items-start gap-4'>
                <Avatar name={course.instructor} size={40} />
                <div className="flex flex-col">
                  <p className="text-gray-800 font-medium">New Course Review</p>
                  <p className="text-[12px] text-gray-500">{course.instructorName}</p>
                  <p className="text-[12px] text-gray-500">{course.title}</p>
                  <p className="text-[12px] text-gray-400 whitespace-nowrap">{course.createdAt.split("T")[0]}</p>
                </div>
              </div>
              <div className="flex flex-col ">
                <p className='flex justify-between  items-center bg-[#FEF9C3] rounded-md p-1 text-[12px]'><CiClock1 className='text-sm me-1' /> Needs Review </p>
                <p
                  onClick={() => navigate("/admin/courses/reviewcourse", { state: { course } })}
                  className="flex items-center justify-end rounded-md p-1 text-[12px] cursor-pointer hover:bg-gray-200 mt-6"
                >
                  Review <FaArrowRightLong className="text-sm ms-1 cursor-pointer" />
                </p>            </div>
            </div>
          ))}
        </div>
        {pendingCourses.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-5 w-full rounded-lg border border-gray-200 bg-gray-50 py-2 text-[13px] font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer">
            {showAll ? "Show less" : "Show all activities"}
          </button>
        )}
      </div>
    </div>
  )
}
