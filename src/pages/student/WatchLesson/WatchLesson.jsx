import VideoPage from "./ActiveTabs/VideoPage.jsx";
import LessonInfo from "./ActiveTabs/LessonInfo.jsx";
import ActiveTab from "./ActiveTabs/ActiveTabs.jsx";
import { useLocation } from "react-router-dom";
import CourseContent from "./CourseContent.jsx";

export default function WatchLesson() {
  const location = useLocation();
  const lessonTitle = location.state?.title || "Select a Lesson";

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
    ]

  return (
    <div className="min-h-screen bg-[#fcfdfd] overflow-hidden">
      <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row items-start gap-0 lg:gap-8 lg:p-6 xl:p-10 overflow-hidden">
        
        <div className="w-full xl:flex-1 order-1 flex flex-col bg-white overflow-hidden">
          
          <div className="w-full bg-black lg:rounded-2xl overflow-hidden shadow-2xl aspect-video">
            <VideoPage />
          </div>
          
          <div className="p-4 sm:p-6 lg:p-8 overflow-hidden">
            <div className="max-w-[1012px] overflow-hidden">
              <LessonInfo title={lessonTitle} />
              
              <div className="mt-8 border-t border-gray-100 pt-8 overflow-hidden">
                <ActiveTab />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full xl:w-[420px] order-2 xl:sticky xl:top-10 overflow-hidden">
          <div className="bg-white lg:rounded-xl shadow-sm border border-gray-100 lg:border-none overflow-hidden">
             <CourseContent
                courseData={courseData} 
                currentLessonTitle={lessonTitle}
              />
          </div>
        </div>

      </div>
    </div>
  );
}