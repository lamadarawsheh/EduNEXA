import React from 'react';
import { useNavigate } from 'react-router-dom';

const LessonItem = ({ lesson }) => {
  const navigate = useNavigate();

  const handleLessonClick = () => {
  navigate('/student/watchlesson', { 
    state: { 
      videoUrl: lesson.videoUrl, 
      title: lesson.title,
      description: lesson.description,
      id: lesson.id
    } 
  });
};

  const getDuration = () => {
    const duration = lesson.duration || lesson.Duration;
    if (!duration) return '0 mins';
    
    if (typeof duration === 'string' && (duration.includes('Minutes') || duration.includes('Hour') || duration.includes('mins') || duration.includes('hrs'))) {
      return duration;
    }
    
    if (typeof duration === 'string' && duration.includes(':')) {
      const parts = duration.split(':');
      const hours = parseInt(parts[0]) || 0;
      const minutes = parseInt(parts[1]) || 0;
      
      if (hours > 0 && minutes > 0) return `${hours} Hour ${minutes} Minutes`;
      if (hours > 0) return `${hours} Hour`;
      if (minutes > 0) return `${minutes} Minutes`;
      return '0 mins';
    }
    
    return duration;
  };

  return (
    <div 
      onClick={handleLessonClick}
      className={`flex justify-between items-center p-4 mb-3 rounded-xl border transition-all cursor-pointer hover:bg-emerald-50/30 ${
        lesson.isActive 
        ? 'border-emerald-400 bg-emerald-50/50 shadow-sm' 
        : 'border-gray-100 bg-white hover:border-gray-200 shadow-sm'
      }`}
    >
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-800 leading-tight">
          {lesson.title || lesson.Title || lesson.name || 'Untitled Lesson'}
        </span>
        <span className="text-xs text-gray-400 mt-1">Lesson {lesson.id || lesson.lessonId || lesson.lectureId || lesson.orderIndex || ''}</span>
      </div>
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
        lesson.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-50 text-gray-500'
      }`}>
        <span className="text-sm">🕒</span>
        {getDuration()}
      </div>
    </div>
  );
};

export default LessonItem;
