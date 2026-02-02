import React, { useEffect, useMemo, useState } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { CiClock1, CiStar } from "react-icons/ci";
import { FiUsers } from 'react-icons/fi';
import { TbClockHour4 } from 'react-icons/tb';
import { MdOutlineDateRange } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import Pagination from './../dashboardComponents/Pagination';


export default function Course({ acceptedCourses, pendingCourses, search }) {
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState("");
    const [filter, setFilter] = useState("accepted");
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const courses = filter === "accepted" ? acceptedCourses : pendingCourses;
    const processedCourses = useMemo(() => {
    const data = Array.isArray(courses) ? [...courses] : [];
    const q = (search ?? "").trim().toLowerCase();
    const filtered = !q
        ? data
        : data.filter((c) => {
        const title = (c.title ?? "").toLowerCase();
        const instructor = (c.instructorName ?? "").toLowerCase();
        return title.includes(q) || instructor.includes(q);
        });
    const sorted = [...filtered].sort((a, b) => {
        if (sortBy === "date") return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        return 0;
    });
    return sorted;
    }, [courses, search, sortBy]);
    useEffect(() => {
    setPage(1);
    }, [search, sortBy, filter]);
    const totalPages = Math.ceil(processedCourses.length / ITEMS_PER_PAGE);
    const paginatedCourses = processedCourses.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
    );
        return (
        <>
            <div className="mt-6 flex justify-between">
                <div className='flex gap-2'>
                    <select className={`flex items-center gap-1 border-1 border-gray-200 text-black px-4 py-2 rounded-sm shadow-md text-xs hover:border-[#145A58] transition-colors`}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}>
                        <option value="accepted">Accepted Courses</option>
                        <option value="pending">Pending Courses</option>
                    </select>
                </div>
                <div className="flex items-center gap-2 justify-end">
                    <span className=" rounded-xl  py-1 px-1 text-sm bg-gray-100 hover:bg-gray-200">
                        sort by
                    </span>
                <select value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                className="flex items-center gap-1 border border-gray-200 text-black px-4 py-2 rounded-sm shadow-md text-xs"
                >
                        <option value="">No Sort</option>
                        <option value="date">Date</option>
                        <option value="rating">Rating</option>
                </select>
                </div>
            </div>
                    <span className='text-[12px] mb-6'>Mange and Organize your courses</span>
            <div className="rounded-xl border border-gray-200 bg-white my-6 p-4 w-[100%] ">
                <div className="mt-4 flex flex-wrap gap-4 justify-between">
                    {paginatedCourses.map((course, index) => (
                        <div key={course.id ?? index} className='shadow-md mb-4 pt-4 pb-2 px-4 rounded-lg border border-gray-200 w-[100%] xl:w-[48%]'>
                            <div className="flex justify-between items-start gap-4">
                                <div className='flex justify-start items-start gap-4'>
                                    <div className="flex flex-col">
                                        <h4 className="text-md font-semibold">{course.title}</h4>
                                        <h4 className="text-sm text-gray-600 mb-4">{course.instructorName}</h4>
                                        <div className="flex gap-4">
                                            <div className="me-2 flex gap-2">
                                               {course.status === "Approved" ? <FiUsers /> : null}
                                                <span className="text-sm text-gray-600">
                                                    {course.studentsCount ? `${course.studentsCount} Students` : '-'}
                                                </span>
                                            </div>
                                            {course.status === "Approved" ? (
                                                <div className="me-2 flex gap-2">
                                                    <TbClockHour4 />
                                                    <span className="text-sm text-gray-600">
                                                        {course.estimatedDuration ? `${course.estimatedDuration} hours` : ""}
                                                    </span>
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="me-2 flex gap-2 items-center">
                                                <MdOutlineDateRange />
                                                <span className="text-sm text-gray-600">{course.createdAt.split("T")[0]}</span>
                                            </div>
                                            {course.status === "Approved" ? (
                                                <div className="me-2 flex gap-2 items-center">
                                                    <CiStar />
                                                    <span className="text-sm text-gray-600">{course.rating}</span>
                                                </div>
                                            ) : (<div className="me-2 flex gap-2">
                                                <TbClockHour4 />
                                                <span className="text-sm text-gray-600">
                                                    {course.durationWeeks} weeks
                                                </span>
                                            </div>)}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col ">
                                    {course.status === "Approved" ? (
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
                    {paginatedCourses.length === 0 && (
            <div className="w-full text-center py-6 text-gray-500">
                        No Courses To Display
            </div>
            )}
            </div>
            </div>
            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={(p) => setPage(p)}
            />
        </>
    )
}
