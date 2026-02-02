import React, { useState } from 'react';
import { formatDuration } from "../../../services/mylessonService";

export default function CourseContent({ courseData, currentLessonTitle, onLessonClick }) {
  const [openWeek, setOpenWeek] = useState(null);

  const allLessons = courseData?.flatMap(section => section.lessons || []) || [];
  const completedCount = allLessons.filter(l => l.isCompleted).length;
  const totalPercentage = allLessons.length > 0
    ? Math.round((completedCount / allLessons.length) * 100)
    : 0;

  return (
    <div className="w-full bg-white border border-[#e2e8f0] rounded-sm shadow-sm font-sans">

      <div className="p-5 flex justify-between items-center border-b border-[#e2e8f0]">
        <h2 className="text-[22px] font-bold text-[#08332e]">Course Contents</h2>
        <span className="text-[18px] font-medium text-[#08332e]">{totalPercentage}% Completed</span>
      </div>

      <div className="w-full h-[3px] bg-gray-100">
        <div
          className="h-full bg-[#08332e] transition-all duration-500"
          style={{ width: `${totalPercentage}%` }}
        ></div>
      </div>

      <div className="w-full">
        {courseData?.map((section, index) => {
          const sectionId = section.id || section.Id;
          const isOpen = openWeek === sectionId;

          return (
            <div key={sectionId || index} className="border-b border-[#176D69] last:border-b-0">

              <button
                onClick={() => setOpenWeek(isOpen ? null : sectionId)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-[#08332e] transition-transform ${isOpen ? 'rotate-0' : '-rotate-90'}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                  </span>
                  <span className="text-[16px] font-semibold text-[#08332e] text-left">
                    {section.title || section.name}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-[#5f7c7d] text-[14px]">
                  <span className="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m10 8 6 4-6 4V8z" /></svg>
                    {section.lessons?.length || 0} lectures
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="pb-2 bg-[#fcfdfd]">
                  {section.lessons?.map((lesson, idx) => {
                    const isCurrent = currentLessonTitle === lesson.title;

                    return (
                      <div
                        key={lesson.id || idx}
                        onClick={() => onLessonClick(lesson)}
                        className={`group flex items-center gap-4 px-6 py-4 cursor-pointer transition-all border-y border-transparent ${isCurrent ? 'bg-[#e7f6f5] border-[#b2dfdb]' : 'hover:bg-emerald-50/30'
                          }`}
                      >
                        <div className={`w-[20px] h-[20px] rounded-sm border flex items-center justify-center flex-shrink-0 ${lesson.isCompleted ? 'bg-[#08332e] border-[#08332e]' : 'border-gray-300 bg-white'
                          }`}>
                          {lesson.isCompleted && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>}
                        </div>

                        <span className={`flex-1 text-[14px] text-left ${isCurrent ? 'text-[#08332e] font-bold' : 'text-[#4a5568]'}`}>
                          {idx + 1}. {lesson.title}
                        </span>

                        <div className="flex items-center gap-3 text-[#08332e]">
                          <span className="text-[12px] font-medium text-gray-400">
                            {formatDuration(lesson.duration)}
                          </span>
                          {isCurrent ? (
                            <svg className="animate-pulse" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                          ) : (
                            <svg className="opacity-0 group-hover:opacity-100 transition-opacity" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="m7 4 12 8-12 8V4z" /></svg>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}