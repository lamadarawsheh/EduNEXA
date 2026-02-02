import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VideoPage from "./ActiveTabs/VideoPage.jsx";
import LessonInfo from "./ActiveTabs/LessonInfo.jsx";
import ActiveTab from "./ActiveTabs/ActiveTabs.jsx"; 
import CourseContent from "./CourseContent.jsx";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseReviews } from '../../../ReduxToolkit/Slices/ReviewSlice.js';
import { getCourseDetails, getCourseSections, getSectionLectures } from "../../../services/mylessonService";

export default function WatchLesson() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const [currentLesson, setCurrentLesson] = useState(location.state || { title: "Select a Lesson" });
  const [sections, setSections] = useState([]);
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const courseId = location.state?.courseId || "88582B42-C8C6-444A-805E-08DE4DCD3B53";
  const STUDENT_ID = "9044837B-AA68-46EC-010C-08DE487F569E";

  const { items: reviews, isLoading } = useSelector((state) => state.reviews);

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setLoading(true);
        dispatch(fetchCourseReviews(courseId));

        const details = await getCourseDetails(courseId);
        setCourseDetails(details.data);

        const secRes = await getCourseSections(courseId);
        const rawSections = secRes.data?.$values || secRes.data || [];

        const hydratedSections = await Promise.all(
          rawSections.map(async (sec) => {
            const lecRes = await getSectionLectures(sec.id);
            return { 
              ...sec, 
              lessons: lecRes.data?.$values || lecRes.data || [] 
            };
          })
        );
        setSections(hydratedSections);
      } catch (error) {
        console.error("Failed to load course data", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [dispatch, courseId]);

  const handleLessonSwitch = (lesson) => {
    setCurrentLesson(lesson);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const averageRating = reviews?.length > 0 
    ? (reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const hasRated = reviews?.some(r => r.studentId?.toLowerCase() === STUDENT_ID.toLowerCase());

  if (loading) return <div className="p-20 text-center font-bold text-[#176D69]">Loading Classroom...</div>;

  return (
    <div className="min-h-screen bg-[#fcfdfd] overflow-hidden">
      <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row items-start gap-0 lg:gap-8 lg:p-6 xl:p-10">
        
        <div className="w-full xl:flex-1 order-1 flex flex-col bg-white">
          <div className="px-4 py-3 lg:px-0 lg:pb-6 flex items-center">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[#176D69] font-bold hover:opacity-70 transition-all cursor-pointer group"
            >
              <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">Back to Course Details</span>
            </button>
          </div>

          <div className="w-full bg-black lg:rounded-2xl overflow-hidden shadow-2xl aspect-video">
            <VideoPage videoUrl={currentLesson.videoUrl || currentLesson.videoPath} />
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-[1012px]">
              <LessonInfo 
                title={currentLesson.title} 
                commentCount={reviews.length} 
                rating={averageRating} 
                courseId={courseId} 
                studentId={STUDENT_ID}
                hasRated={hasRated}
                studentsCount={courseDetails?.enrolledStudentsCount || 0}
                lastUpdated={courseDetails?.updatedAt || courseDetails?.createdAt}
              />
              
              <div className="mt-8 border-t border-gray-100 pt-8">
                <ActiveTab 
                  reviews={reviews} 
                  isLoading={isLoading}
                  description={currentLesson.description}
                  notes={currentLesson.notes}
                  files={currentLesson.attachments}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full xl:w-[420px] order-2 xl:sticky xl:top-10">
            <CourseContent 
              courseData={sections} 
              currentLessonTitle={currentLesson.title}
              onLessonClick={handleLessonSwitch}
            />
        </div>
      </div>
    </div>
  );
}