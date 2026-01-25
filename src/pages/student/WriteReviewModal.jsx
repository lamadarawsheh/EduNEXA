import React, { useState } from "react";
import { X, Send } from "lucide-react";

export default function DynamicReviewSection() {
  // حالات الحالة الديناميكية (Dynamic States)
  const [rating, setRating] = useState(0); // التقييم المختار
  const [hover, setHover] = useState(0);   // التقييم عند مرور الماوس
  const [feedback, setFeedback] = useState(""); // نص التعليق

  // دالة لتحديد وصف التقييم بناءً على النجوم
  const getRatingText = (val) => {
    if (val === 0) return "(Rate this course)";
    if (val <= 2) return "(Poor/Fair)";
    if (val <= 3) return "(Average/Good)";
    return "(Good/Amazing)";
  };

  const handleSubmit = () => {
    // هنا يتم ربط الـ API مستقبلاً
    console.log("Submitting:", { rating, feedback });
    alert(`Thank you! You rated this ${rating} stars.`);
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <h2 className="text-[#093332] text-lg font-semibold tracking-tight">Write a Review</h2>
        <button onClick={() => {setRating(0); setFeedback("");}} className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
          <X size={20} />
        </button>
      </div>

      <div className="p-8 flex flex-col items-center">
        
        {/* Dynamic Rating Score */}
        <div className="mb-4 flex items-center gap-2">
          <span className="text-3xl font-bold text-[#093332]">
            {hover || rating || 0}.0
          </span>
          <span className="text-gray-500 font-medium text-lg">
            {getRatingText(hover || rating)}
          </span>
        </div>

        {/* Dynamic Stars Selection */}
        <div className="flex gap-2 mb-10">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              className="cursor-pointer transition-transform hover:scale-110 outline-none"
            >
              <svg 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill={star <= (hover || rating) ? "#FF782D" : "none"} 
                stroke={star <= (hover || rating) ? "#FF782D" : "#E5E7EB"}
                strokeWidth="2"
                className="transition-colors duration-200"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
          ))}
        </div>

        {/* Feedback Input Field */}
        <div className="w-full space-y-3 text-left">
          <label className="text-sm font-semibold text-gray-700 block ml-1">
            Feedback
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write down your feedback here..."
            className="w-full h-40 p-5 bg-[#F4F7F7] border-none rounded-sm outline-none text-gray-600 placeholder:text-[#638483] resize-none text-base focus:ring-1 focus:ring-[#FF782D]/30 transition-all"
          />
        </div>

        {/* Footer Actions */}
        <div className="w-full mt-8 flex items-center justify-between">
          <button 
            onClick={() => setFeedback("")}
            className="text-[#093332] font-bold text-base hover:opacity-70 transition-opacity cursor-pointer"
          >
            Cancel
          </button>
          
          <button 
            onClick={handleSubmit}
            disabled={rating === 0}
            className={`flex items-center gap-3 px-10 py-4 rounded-sm font-bold shadow-md transition-all cursor-pointer active:scale-95
              ${rating === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-[#FF6A35] text-white hover:bg-[#e85a2a]"}
            `}
          >
            Submit Review
            <Send size={20} className="rotate-[-45deg] fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
}