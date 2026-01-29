import React, { useState } from 'react';

export default function CourseContent({ courseData, currentLessonTitle, onLessonClick }) {
  const [openWeek, setOpenWeek] = useState(1);

  const allLessons = courseData.flatMap(week => week.lessons);
  const completedCount = allLessons.filter(l => l.isCompleted).length; 
  const totalPercentage = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 15;

  return (
    <div className="w-full mt-10 bg-white border border-[#e2e8f0] rounded-sm shadow-sm  font-sans">
      
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
        {courseData.map((item) => {
          const isOpen = openWeek === item.week;
          const weekCompleted = item.lessons.filter(l => l.isCompleted).length;

          return (
            <div key={item.week} className="border-b border-[#176D69] last:border-b-0">
              
              <button 
                onClick={() => setOpenWeek(isOpen ? null : item.week||1)}
                className="w-full p-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-[#08332e] transition-transform ${isOpen ? 'rotate-0' : '-rotate-90'}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </span>
                  <span className="text-[16px] font-semibold text-[#08332e]">{item.title}</span>
                </div>
                
                <div className="flex items-center gap-4 text-[#5f7c7d] text-[14px]">
                  <span className="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8z"/></svg>
                    {item.lessons.length} lectures
                  </span>
                  <span className="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    51m
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="pb-2">
                  <div className="flex gap-6 px-14 mb-4 text-[#5f7c7d] text-[14px]">
                     <span className="flex items-center gap-2 italic">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8z"/></svg>
                       {item.lessons.length} lectures
                     </span>
                     <span className="flex items-center gap-2">
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                       51m
                     </span>
                     <span className="flex items-center gap-2">
                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                       25% finish ({weekCompleted}/{item.lessons.length})
                     </span>
                  </div>

                  {item.lessons.map((lesson) => {
                    const isCurrent = currentLessonTitle === lesson.title;
                    const isCompleted = lesson.id === "01"; 

                    return (
                      <div 
                        key={lesson.id}
                        onClick={() => onLessonClick(lesson)}
                        className={`group flex items-center gap-4 px-6 py-4 cursor-pointer transition-all border-y border-transparent ${
                          isCurrent ? 'bg-[#e7f6f5]' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-[22px] h-[22px] rounded-sm border flex items-center justify-center flex-shrink-0 ${
                          isCompleted ? 'bg-[#08332e] border-[#08332e]' : 'border-[#08332e] bg-white'
                        }`}>
                          {isCompleted && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>}
                        </div>
                        <span className={`flex-1 text-[14px] ${isCurrent ? 'text-[#08332e] font-medium' : 'text-[#4a5568]'}`}>
                          {parseInt(lesson.id)}. {lesson.title}
                        </span>

                        <div className="flex items-center gap-3 text-[#08332e]">
                          {isCurrent ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="m7 4 12 8-12 8V4z"/></svg>
                          )}
                          <span className="text-[14px] font-medium">07:31</span>
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