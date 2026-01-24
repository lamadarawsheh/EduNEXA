import React from 'react';
import {  useNavigate } from 'react-router-dom';

const LessonItem = ({ lesson }) => {

const navigate = useNavigate();

const handleLessonClick = () =>{
  navigate('/student/watchlesson', {state: {title: lesson.title}});
} 

return (
  <div 
  onClick={handleLessonClick}
  className={`flex justify-between items-center p-4 mb-3 rounded-xl border transition-all cursor-pointer hover:bg-emerald-50/30 ${
    lesson.isActive 
    ? 'border-emerald-400 bg-emerald-50/50 shadow-sm' 
    : 'border-gray-100 bg-white hover:border-gray-200 shadow-sm'
  }`}>
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-gray-800 leading-tight">
        {lesson.title}
      </span>
      <span className="text-xs text-gray-400 mt-1">Lesson {lesson.id}</span>
    </div>
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
      lesson.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-50 text-gray-500'
    }`}>
      <span className="text-sm">🕒</span>
      {lesson.duration}
    </div>
  </div>
)};

export default function LessonCard() {

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
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-32 p-6 pb-20 justify-items-center  mt-14 sm:mt-22">
      {courseData.map((item, index) => (
        <div key={index} className="relative group flex flex-col items-center w-full max-w-[600px]">
          
          <div className="absolute text-center -top-18 w-[600px] max-w-full h-[53px] bg-[#1b5e54] text-white flex items-center justify-center rounded-lg font-bold tracking-wide shadow-lg border-2 border-[#1b5e54] z-10">
            Week {item.week}
          </div>
          <div className="p-8 w-[600px] max-w-full min-h-[367px] h-auto gap-4 bg-white border-x border-b border-gray-100 rounded-b-2xl shadow-sm relative pt-12">
            <h3 className="text-xl font-bold text-[#093332] mb-6 px-4">
              {item.title}
            </h3> 
            
            <div className="space-y-4">
              {item.lessons.map((lesson) => (
                <LessonItem key={lesson.id} lesson={lesson} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}