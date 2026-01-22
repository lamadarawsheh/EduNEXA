import React from 'react';
const LessonItem = ({ lesson }) => (
  <div className={`flex justify-between items-center p-4 mb-3 rounded-xl border transition-all ${
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
);
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
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {courseData.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
  
            <div className="bg-[#1b5e54] text-white py-3 px-6 text-center font-bold tracking-wide">
              Week {item.week}
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-8">
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
    </div>
  );
}