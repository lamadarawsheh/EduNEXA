import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from '../Avatar';
import { CiClock1 } from 'react-icons/ci';
import { GoTag } from "react-icons/go";
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { IoCalendarClearOutline } from "react-icons/io5";
import { FiDollarSign } from "react-icons/fi";
import { MdOutlineAccessTime } from "react-icons/md";
import { FiBookOpen } from "react-icons/fi";
import Popup from './../../../../components/common/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { putApproveCourse, putRejectCourse } from '../../../../ReduxToolkit/slices/AdminCoursesActions';
import { fetchCourseReview } from '../../../../ReduxToolkit/slices/AdminCourseReview';





export default function ReviewCourse() {
  const { state } = useLocation();
  const course = state?.course;
  const courseId = course?.id
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const { courseData, isLoading, error } = useSelector( 
  (state) => state.courseReview ?? { courseData: {}, isLoading: false, error: null } ) 
  useEffect(() => { if (courseId)
  dispatch(fetchCourseReview(courseId)); }
  , [courseId, dispatch]); 
  const [notes, setNotes] = useState(""); 
  const { approve, reject } = useSelector( 
    (state) => state.courseAction ?? { approve: 
    { loading: false, error: null, data: null }, 
    reject: { loading: false, error: null, data: null }, 
  } );
  const [popupOpen, setPopupOpen] = useState(false);
const [popupType, setPopupType] = useState("success"); 
const [popupTitle, setPopupTitle] = useState("");
const [popupMessage, setPopupMessage] = useState("");

  const handleApprove = async () => {
  if (!courseId) return;

  const res = await dispatch(
    putApproveCourse({ id: courseId, approvalReason: notes })
  );

  if (putApproveCourse.fulfilled.match(res)) {
    setPopupType("success");
    setPopupTitle("Approved");
    setPopupMessage("Course approved successfully");
    setPopupOpen(true);
  } else {
    setPopupType("error");
    setPopupTitle("Error");
    setPopupMessage("Failed to approve course");
    setPopupOpen(true);
  }
};

  const handleReject = async () => {
  if (!courseId) return;

  const res = await dispatch(
    putRejectCourse({ id: courseId, rejectionReason: notes })
  );

  if (putRejectCourse.fulfilled.match(res)) {
    setPopupType("success");
    setPopupTitle("Rejected");
    setPopupMessage("Course rejected successfully");
    setPopupOpen(true);
  } else {
    setPopupType("error");
    setPopupTitle("Error");
    setPopupMessage("Failed to reject course");
    setPopupOpen(true);
  }
};
  const actionLoading = approve.loading || reject.loading;

  if (!course) return <p>No course data</p>;
  return (
    <>
      <div className="p-2 md:p-8 flex-col">
        <div className="px-2 py-4 md:px-4 rounded-2xl shadow-md  min-h-[40px] flex-col items-between bg-[#176D69]">
          <div className="flex justify-between items-center w-full">
            <h className='font-bold text-white text-lg md:text-2xl'> Review Course </h>
            <p
              onClick={() => navigate("/admin/courses")}
              className="font-md text-white text-md md:text-lg flex items-center"
            >
              <FaArrowLeftLong className="text-md me-2" />
              Back To Courses
            </p>
          </div>

        </div>
        
        <div className="mt-4 flex ">  
          <p className='flex items-center'> Courses <FaArrowRightLong className="text-sm ms-1" /></p>
        <p className='flex items-center ms-2'>Pending Courses <FaArrowRightLong className="text-sm ms-1" /></p>
        <p className='flex items-center ms-2'>Review Courses</p>
        </div>
        <div className="mt-4 flex flex-col gap-4 shadow-md mb-4 pt-4 pb-2 px-4 bg-white rounded-lg border border-gray-200 w-[100%]">
          <div className="flex justify-between items-start gap-4">
            <p className="text-gray-800 font-bold text-lg">{course.title}</p>
            <div className="flex flex-col ">
              <p className='flex justify-between  items-center bg-[#FEF9C3] rounded-md p-1 text-[12px]'><CiClock1 className='text-sm me-1' /> Needs Review </p>
            </div>
          </div>
          <div key={course.id} className="flex justify-between items-start gap-4">
            <div className='flex justify-start items-start gap-4'>
              <Avatar name={course.instructor} size={40} />
              <div className="flex flex-col">
                <p className="text-[12px] text-gray-500">{course.instructorName}</p>
                <p className="text-[12px] text-gray-500">Course Instructor</p>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4 shadow-md mb-4 pt-4 pb-2 px-4 bg-white rounded-lg border border-gray-200 w-[100%]">
          <p className="text-gray-800 font-bold text-lg">Course Details</p>
          <div className="flex flex-wrap justify-between items-center gap-8">
            <div className='flex justify-start items-start gap-4 w-[100%] lg:w-[48%]'>
              <span className='bg-green-100 p-2 rounded-md'>
                <GoTag className='w-8 h-8 ' />
              </span>
              <div className="flex flex-col">
                <p className="text-[12px] text-gray-500">Subcategory</p>
                <p className="text-[14px] text-gray-900">{courseData.subCategoryName}</p>
              </div>
            </div>

            <div className='flex justify-start items-start gap-4 w-[100%] lg:w-[48%]'>
              <span className='bg-green-100 p-2 rounded-md'>
                <MdOutlineAccessTime className='w-8 h-8 ' />
              </span>
              <div className="flex flex-col">
                <p className="text-[12px] text-gray-500">Duration</p>
                <p className="text-[14px] text-gray-900">{courseData.estimatedDuration} hours</p>
              </div>
            </div>

            <div className='flex justify-start items-start gap-4 w-[100%] lg:w-[48%]'>
              <span className='bg-green-100 p-2 rounded-md'>
                <FiDollarSign className='w-8 h-8 ' />
              </span>
              <div className="flex flex-col">
                <p className="text-[12px] text-gray-500">Price</p>
                <p className="text-[14px] text-gray-900">${courseData.price}</p>
              </div>
            </div>

            <div className='flex justify-start items-start gap-4 w-[100%] lg:w-[48%]'>
              <span className='bg-green-100 p-2 rounded-md'>
                <IoCalendarClearOutline className='w-8 h-8 ' />
              </span>
              <div className="flex flex-col">
                <p className="text-[12px] text-gray-500">Submission date</p>
                <p className="text-[14px] text-gray-900">{courseData.createdAt?.split("T")[0]}</p>
              </div>
            </div>
          </div>
          <p className="text-gray-800 font-md text-md border-t-1 flex items-center">< FiBookOpen className='w-5 h-5 me-2' /> Course Description</p>
          <p className="text-[14px] text-gray-500">{courseData.description}</p>

        </div>

        <div className="mt-4 flex flex-col gap-4 shadow-md mb-4 py-4  px-4 bg-white rounded-lg border border-gray-200 w-[100%]">
          <p className="text-gray-800 font-bold text-lg">Review Action</p>
          <p className='text-sm'>Notes (Optional)</p>
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add your notes here..."
            onChange={(e) => setNotes(e.target.value)}></textarea>
        </div>

        <div className="flex justify-end gap-4 mb-4">
           <button
    onClick={handleApprove}
    disabled={actionLoading}
    className={`w-[50%] rounded-md py-2 font-semibold text-white transition
      ${actionLoading ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
  >
    {approve.loading ? "Approving..." : "Approve Course"}
  </button>

  <button
    onClick={handleReject}
    disabled={actionLoading}
    className={`w-[50%] rounded-md py-2 font-semibold text-white transition
      ${actionLoading ? "bg-red-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
  >
    {reject.loading ? "Rejecting..." : "Reject Course"}
  </button>
      </div>
      </div>

      <Popup
        isOpen={popupOpen}
        type={popupType}
        title={popupTitle}
        message={popupMessage}
        actionLabel="OK"
        onClose={() => {
        setPopupOpen(false);
        navigate("/admin/courses");
      }}
/>
    </>
  )
}
