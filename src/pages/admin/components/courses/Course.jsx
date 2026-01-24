import React, { useState } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { CiClock1, CiStar } from "react-icons/ci";
import { FiUsers } from 'react-icons/fi';
import { TbClockHour4 } from 'react-icons/tb';
import { MdOutlineDateRange } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";


export default function Course() {

    const courses = [
    { title: "ًWeb Development", instructor: "Dr. Sarah Mohamed", status: "Active", statusBg: "bg-green-200",course:"Machine Learning for review", students: 85, durationWeeks: 16, startDate: "12/12/2025", rating: 5, },
    { title: "ًWeb Development", instructor: "Dr. Sarah Mohamed", status: "Active", statusBg: "bg-green-200",course:"Machine Learning for review", students: 85, durationWeeks: 16, startDate: "12/12/2025", rating: 5, },
    { title: "ًWeb Development", instructor: "Dr. Sarah Mohamed", status: "Active", statusBg: "bg-green-200",course:"Machine Learning for review", students: 85, durationWeeks: 16, startDate: "12/12/2025", rating: 5, },  
    { title: "ًWeb Development", instructor: "Dr. Sarah Mohamed", status: "Active", statusBg: "bg-green-200",course:"Machine Learning for review", students: 85, durationWeeks: 16, startDate: "12/12/2025", rating: 5, },
    { title: "ًWeb Development", instructor: "Dr. Sarah Mohamed", status: "Active", statusBg: "bg-green-200",course:"Machine Learning for review", students: 85, durationWeeks: 16, startDate: "12/12/2025", rating: 5, },
    { title: "ًWeb Development", instructor: "Dr. Sarah Mohamed", status: "Active", statusBg: "bg-green-200",course:"Machine Learning for review", students: 85, durationWeeks: 16, startDate: "12/12/2025", rating: 5, }, 
    { title: "ًWeb Development", instructor: "Dr. Sarah Mohamed", status: "Active", statusBg: "bg-green-200",course:"Machine Learning for review", students: 85, durationWeeks: 16, startDate: "12/12/2025", rating: 5, },
    { title: "ًWeb Development", instructor: "Dr. Sarah Mohamed", status: "Active", statusBg: "bg-green-200",course:"Machine Learning for review", students: 85, durationWeeks: 16, startDate: "12/12/2025", rating: 5, },
    { title: "ًWeb Development", instructor: "Dr. Sarah Mohamed", status: "Active", statusBg: "bg-green-200",course:"Machine Learning for review", students: 85, durationWeeks: 16, startDate: "12/12/2025", rating: 5, },  
    { title: "ًWeb Development", instructor: "Dr. Sarah Mohamed", status: "Active", statusBg: "bg-green-200",course:"Machine Learning for review", students: 85, durationWeeks: 16, startDate: "12/12/2025", rating: 5, },
    { title: "ًWeb Development", instructor: "Dr. Sarah Mohamed", status: "Active", statusBg: "bg-green-200",course:"Machine Learning for review", students: 85, durationWeeks: 16, startDate: "12/12/2025", rating: 5, },
    { title: "ًWeb Development", instructor: "Dr. Sarah Mohamed", status: "Active", statusBg: "bg-green-200",course:"Machine Learning for review", students: 85, durationWeeks: 16, startDate: "12/12/2025", rating: 5, },  
    { title: "ًWeb Development", instructor: "Dr. Sarah Mohamed", status: "Active", statusBg: "bg-green-200",course:"Machine Learning for review",  durationWeeks: 16, startDate: "12/12/2025",  },
    { title: "ًWeb Development", instructor: "Dr. Sarah Mohamed", status: "Needs Review", statusBg: "bg-green-200",course:"Machine Learning for review", students: 85, durationWeeks: 16, startDate: "12/12/2025", rating: 5, },
    { title: "ًWeb Development", instructor: "Dr. Sarah Mohamed", status: "Needs Review", statusBg: "bg-green-200",course:"Machine Learning for review",  durationWeeks: 16, startDate: "12/12/2025",  },  
    { title: "ًTest 1", instructor: "Dr. Sarah Mohamed", status: "Needs Review", statusBg: "bg-green-200",course:"Machine Learning for review", startDate: "12/12/2025", durationWeeks: 16, },
    { title: "ًTest", instructor: "Dr. Sarah Mohamed", status: "Needs Review", statusBg: "bg-green-200",course:"Machine Learning for review",  durationWeeks: 16, startDate: "12/12/2025", },
    ];
    const [course, setCourse] = useState();
    const navigate = useNavigate();

    return (
<>
<div className="rounded-xl border border-gray-200 bg-white my-6 p-4 w-[100%] ">
    
        <div className="mt-4 flex flex-wrap gap-4 justify-between">
        {courses.map((course, index) => (
        <div className='shadow-md mb-4 pt-4 pb-2 px-4 rounded-lg border border-gray-200 w-[100%] xl:w-[48%]'>
        <div key={index} className="flex justify-between items-start gap-4">
            <div className='flex justify-start items-start gap-4'>
            <div className="flex flex-col">
                <h4 className="text-md font-semibold">{course.title}</h4>
                <h4 className="text-sm text-gray-600 mb-4">{course.instructor}</h4>
                <div className="flex gap-4">
                    <div className="me-2 flex gap-2">
                    {course.status === "Active" ? (
                    <FiUsers />
                    ) : () => "null"}
                    <span className="text-sm text-gray-600">
                    {course.students ? `${course.students} Students` : ''}
                    </span>
                    </div>
                    {course.status === "Active" ? (
                    <div className="me-2 flex gap-2">
                        <TbClockHour4 />
                        <span className="text-sm text-gray-600">
                        {course.durationWeeks} weeks
                        </span>
                    </div>
                    ) : () => "null"}
                    </div>
                    <div className="flex gap-4">
                    <div className="me-2 flex gap-2 items-center">
                        <MdOutlineDateRange />
                        <span className="text-sm text-gray-600">{course.startDate}</span>
                    </div>
                    {course.status === "Active" ? (
                    <div className="me-2 flex gap-2 items-center">
                        <CiStar />
                        <span className="text-sm text-gray-600">{course.rating}</span>
                    </div>
                    ) : (  <div className="me-2 flex gap-2">
                        <TbClockHour4 />
                        <span className="text-sm text-gray-600">
                        {course.durationWeeks} weeks
                        </span>
                    </div>)}
                    </div>
            </div>
            </div>
            <div className="flex flex-col ">
                {course.status === "Active" ? (
                <div className="flex justify-between items-center">
                <span className="rounded-md text-[12px] p-1 bg-green-200">
                {course.status}
                </span>
                <BsThreeDotsVertical className="text-gray-600" />
            </div>
                ) : (
                  <div className="flex flex-col justify-center items-between h-full">
            <p className='flex justify-between items-center bg-[#FEF9C3] rounded-md p-1 text-[12px]'><CiClock1 className='text-sm me-1' /> {course.status} </p>
            <p
            onClick={() => navigate("/admin/courses/reviewcourse", { state: { course } })}
            className="flex items-center justify-end rounded-md p-1 text-[12px] cursor-pointer hover:bg-gray-200 mt-6"
            >
                Review <FaArrowRightLong className="text-sm ms-1" />
            </p>
          </div>
          )}
          
          </div>
          </div>
          </div>
      ))}
      </div>
    </div>
</>
  )
}
