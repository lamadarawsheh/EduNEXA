import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VideoPage from "./ActiveTabs/VideoPage.jsx";
import LessonInfo from "./ActiveTabs/LessonInfo.jsx";
import ActiveTab from "./ActiveTabs/ActiveTabs.jsx"; 
import CourseContent from "./CourseContent.jsx";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseReviews } from '../../../ReduxToolkit/Slices/ReviewSlice.js';

export default function WatchLesson() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const lessonTitle = location.state?.title || "Select a Lesson";

  const { items: reviews, isLoading } = useSelector((state) => state.reviews);

  const COURSE_ID = "88582B42-C8C6-444A-805E-08DE4DCD3B53";
  const STUDENT_ID = "9044837B-AA68-46EC-010C-08DE487F569E";

  useEffect(() => {
    dispatch(fetchCourseReviews(COURSE_ID));
  }, [dispatch, COURSE_ID]);

  const averageRating = reviews && reviews.length > 0 
    ? (reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const hasRated = reviews?.some(r => r.studentId?.toLowerCase() === STUDENT_ID.toLowerCase());


    const courseData = [
    {
      week: 1,
      title: "Introduction to UI/UX Design",
      lessons: [
        { id: "01", title: "Understanding UI/UX Design Principles", duration: "45 Minutes" },
        { id: "02", title: "Importance of User-Centered Design", duration: "1 Hour", isActive: true },
        { id: "03", title: "The Role of UI/UX Design in Product Development", duration: "45 Minutes" },
      ]
    },
     {
      week: 2,
      title: "User Research and Analysis",
      lessons: [
        { id: "01", title: "Conducting User Research and Interviews", duration: "1 Hour" },
        { id: "02", title: "Analyzing User Needs and Behavior", duration: "1 Hour" },
        { id: "03", title: "Creating User Personas and Scenarios", duration: "45 Minutes" },
      ]
    },
    {
      week: 3,
      title: "Wireframing and Prototyping",
      lessons: [
        { id: "01", title: "Introduction to Wireframing Tools and Techniques", duration: "1 Hour" },
        { id: "02", title: "Creating Low-Fidelity Wireframes", duration: "1 Hour" },
        { id: "03", title: "Prototyping and Interactive Mockups", duration: "1 Hour" },
      ]
    },
    {
      week: 4,
      title: "Visual Design and Branding",
      lessons: [
        { id: "01", title: "Color Theory and Typography in UI Design", duration: "1 Hour" },
        { id: "02", title: "Visual Hierarchy and Layout Design", duration: "1 Hour" },
        { id: "03", title: "Creating a Strong Brand Identity", duration: "45 Minutes" },
      ]
    },
    {
      week: 5,
      title: "Usability Testing and Iteration",
      lessons: [
        { id: "01", title: "Usability Testing Methods and Techniques", duration: "1 Hour" },
        { id: "02", title: "Analyzing Usability Test Results", duration: "45 Minutes" },
        { id: "03", title: "Iterating and Improving UX Designs", duration: "45 Minutes" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfd] overflow-hidden">
      <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row items-start gap-0 lg:gap-8 lg:p-6 xl:p-10">
        
        <div className="w-full xl:flex-1 order-1 flex flex-col bg-white">
          <div className="px-4 py-3 lg:px-0 lg:pb-6 flex items-center">
            <button 
              onClick={() => navigate("/student/course-lessons")}
              className="flex items-center gap-2 text-[#176D69] font-bold hover:opacity-70 transition-all cursor-pointer group"
            >
              <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">Back to My Courses</span>
            </button>
          </div>

          <div className="w-full bg-black lg:rounded-2xl overflow-hidden shadow-2xl aspect-video">
            <VideoPage />
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-[1012px]">
              <LessonInfo 
                title={lessonTitle} 
                commentCount={reviews.length} 
                rating={averageRating} 
                courseId={COURSE_ID} 
                studentId={STUDENT_ID}
                hasRated={hasRated}
              />
              
              <div className="mt-8 border-t border-gray-100 pt-8">
                <ActiveTab 
                  reviews={reviews} 
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full xl:w-[420px] order-2 xl:sticky xl:top-10">
            <CourseContent 
            courseData={courseData || []} 
            currentLessonTitle={lessonTitle}
            />
        </div>
      </div>
    </div>
  );
}