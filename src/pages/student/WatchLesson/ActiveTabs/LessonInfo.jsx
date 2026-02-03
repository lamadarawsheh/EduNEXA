import React, { useState } from "react";
import WriteReviewModal from "../../WriteReviewModal"; 
import { Star, X } from "lucide-react";
import {formatRelativeDate} from '../../../../services/mylessonService'

export default function LessonInfo({ 
  title, 
  commentCount, 
  rating, 
  hasRated, 
  courseId,    
  studentId,
  studentsCount,
  lastUpdated   
}) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const imgs = [
    { img: '../../../../image/A1.PNG' },
    { img: '../../../../image/A2.PNG' },
  ];

  return (
    <div className="w-full max-w-[1012px] mb-6 relative font-sans">
      <h1 className="text-xl md:text-2xl font-bold text-[#08332e] mb-4 leading-tight">
        {title}
      </h1>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-sm text-gray-500 border-b border-gray-100 pb-6">
        
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 shrink-0">
              {imgs.map((item, index) => (
                <div key={index} className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                  <img src={item.img} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
              {studentsCount > 3 && (
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white bg-[#176D69] text-white flex items-center justify-center text-[10px] font-bold">
                  +{studentsCount - 3}
                </div>
              )}
            </div>
           <span className="text-[13px] md:text-sm">
              <strong className="text-slate-800">{studentsCount}</strong> Students watching
            </span>
          </div>

          <button 
            onClick={() => setIsReviewOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-orange-50 transition-colors group"
          >
            <div className="flex text-orange-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  fill={i < Math.round(rating) ? "currentColor" : "none"} 
                />
              ))}
            </div>
            <span className="text-orange-600 font-bold text-sm">{rating}</span>
            <span className="text-gray-400 text-xs group-hover:underline cursor-pointer">
              {hasRated ? "(View Rating)" : "(Rate now)"}
            </span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 md:gap-8">
          <div className="flex items-center gap-1">
            <span>Last updated:</span>
            <span className="text-slate-800 font-semibold whitespace-nowrap">{formatRelativeDate(lastUpdated)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Comments:</span>
            <span className="text-slate-800 font-semibold">{commentCount}</span>
          </div>
        </div>
      </div>

      {isReviewOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
            <WriteReviewModal
                courseId={courseId}
                studentId={studentId}
                hasRated={hasRated}
                onClose={() => setIsReviewOpen(false)}
            />
          </div>
      )}
    </div>
  );
}