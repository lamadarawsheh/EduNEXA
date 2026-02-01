import React, { useState, useEffect } from 'react';

export default function CourseContent({ courseData = [], currentLessonTitle, onLessonClick }) {
  const [openWeek, setOpenWeek] = useState(null);

  useEffect(() => {
    if (courseData && courseData.length > 0 && openWeek === null) {
      setOpenWeek(courseData[0].id || courseData[0].week);
    }
  }, [courseData]);

  // كل الدروس للكورس
  const allLessons = (courseData || []).flatMap(week => week.lectures || week.lessons || []);
  const completedCount = allLessons.filter(l => l.isCompleted).length; 
  const totalPercentage = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0;

  return (
    <div className="w-full mt-10 bg-white border border-[#e2e8f0] rounded-sm shadow-sm font-sans">
      
      {/* عنوان الكورس والنسبة العامة للإنجاز */}
      <div className="p-5 flex justify-between items-center border-b border-[#e2e8f0]">
        <h2 className="text-[22px] font-bold text-[#08332e]">Course Contents</h2>
        <span className="text-[18px] font-medium text-[#08332e]">{totalPercentage}% Completed</span>
      </div>

      {/* Progress Bar للكورس */}
      <div className="w-full h-[3px] bg-gray-100">
        <div 
          className="h-full bg-[#08332e] transition-all duration-500" 
          style={{ width: `${totalPercentage}%` }}
        ></div>
      </div>

      <div className="w-full">
        {(courseData || []).map((item) => {
          const itemId = item.id || item.week;
          const isOpen = openWeek === itemId;
          const lectures = item.lectures || item.lessons || [];
          const weekCompleted = lectures.filter(l => l.isCompleted).length;
          const weekPercentage = lectures.length > 0 ? Math.round((weekCompleted / lectures.length) * 100) : 0;

          return (
            <div key={itemId} className="border-b border-[#176D69] last:border-b-0">
              
              {/* عنوان الأسبوع */}
              <button 
                onClick={() => setOpenWeek(isOpen ? null : itemId)}
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
                    {lectures.length} lectures
                  </span>
                  <span className="flex items-center gap-2">
                    {weekPercentage}% finished ({weekCompleted}/{lectures.length})
                  </span>
                </div>
              </button>

              {/* الدروس */}
              {isOpen && lectures.length > 0 && (
                <div className="pb-2">
                  {/* نسبة الإنجاز لكل درس مكتمل */}
                  <div className="flex gap-6 px-14 mb-4 text-[#5f7c7d] text-[14px] italic">
                    {weekCompleted > 0 && <span>{weekCompleted} lecture(s) completed</span>}
                  </div>

                  {lectures.map((lesson, index) => {
                    const isCurrent = currentLessonTitle === lesson.title;
                    const isCompleted = lesson.isCompleted === true; 
                    const showCheck = isCompleted || isCurrent;

                    return (
                      <div 
                        key={lesson.id}
                        onClick={() => onLessonClick && onLessonClick(lesson)}
                        className={`group flex items-center gap-4 px-6 py-4 cursor-pointer transition-all border-y border-transparent ${
                          isCurrent ? 'bg-[#e7f6f5]' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-[22px] h-[22px] rounded-sm border flex items-center justify-center flex-shrink-0 ${
                          showCheck ? 'bg-[#08332e] border-[#08332e]' : 'border-[#08332e] bg-white'
                        }`}>
                          {showCheck && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>}
                        </div>

                        <span className={`flex-1 text-[14px] ${
                          isCurrent ? 'text-[#08332e] font-bold' : 'text-[#4a5568]'
                        } ${isCompleted ? 'line-through opacity-50' : ''}`}>
                          {index + 1}. {lesson.title}
                        </span>

                        <div className="flex items-center gap-3 text-[#08332e]">
                          {isCurrent ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="m7 4 12 8-12 8V4z"/></svg>
                          )}
                          <span className="text-[14px] font-medium">{lesson.duration || "00:00"}</span>
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
