import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDuration } from "../../../services/mylessonService";
import emptyProduct from './Images/emptyProduct.gif'

const LessonItem = ({ lesson, courseId }) => {
  const navigate = useNavigate();

  const handleLessonClick = () => {
    navigate('/student/watchlesson', {
      state: {
        title: lesson.title,
        videoUrl: lesson.videoUrl,
        description: lesson.description,
        courseId: courseId
      }
    });
  }

  return (
    <div
      onClick={handleLessonClick}
      className={`flex justify-between items-center p-4 mb-3 rounded-xl border transition-all cursor-pointer hover:bg-emerald-50/30 border-gray-100 bg-white hover:border-gray-200 shadow-sm`}
    >
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-800 leading-tight">
          {lesson.title}
        </span>
        <span className="text-xs text-gray-400 mt-1">Lesson {lesson.id?.slice(0, 5)}...</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap bg-gray-50 text-gray-500">
        <span className="text-sm">🕒</span>

        {formatDuration(lesson.duration)}
      </div>
    </div>
  );
};

export default function LessonCard({ sections, courseId }) {

  if (!sections || sections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in">

        <div className="w-64 h-64 md:w-80 md:h-80 mb-4 opacity-90 transition-transform hover:scale-105 duration-500">
          <img
            src={emptyProduct}
            alt="No Lessons Found"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#093332]">
            Lessons are on the way!
          </h2>
          <p className="text-[#5f7c7d] text-base md:text-lg max-w-md mx-auto leading-relaxed">
            The instructor hasn't uploaded the lectures for this course yet. Stay tuned for some amazing content!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-32 p-6 pb-20 justify-items-center mt-14 sm:mt-22">
      {sections.map((item, index) => (
        <div key={item.id || index} className="relative group flex flex-col items-center w-full max-w-[600px]">

          <div className="absolute text-center -top-18 w-[600px] max-w-full h-[53px] bg-[#1b5e54] text-white flex items-center justify-center rounded-lg font-bold tracking-wide shadow-lg border-2 border-[#1b5e54] z-10">
            {item.title || `Section ${index + 1}`}
          </div>

          <div className="p-8 w-[600px] max-w-full min-h-[367px] h-auto gap-4 bg-white border-x border-b border-gray-100 rounded-b-2xl shadow-sm relative pt-12">
            <h3 className="text-xl font-bold text-[#093332] mb-6 px-4">
              {item.description || "Content Overview"}
            </h3>

            <div className="space-y-4">
              {item.lectures && item.lectures.map((lesson) => (
                <LessonItem key={lesson.id} lesson={lesson} courseId={courseId} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}