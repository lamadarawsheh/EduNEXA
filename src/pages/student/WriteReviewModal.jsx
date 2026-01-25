import React, { useState } from "react";
import { Send } from "lucide-react";

export default function WriteReviewModal({ onSubmitReview, onClose }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    onSubmitReview(feedback, rating);
    onClose();
  };

  const getRatingText = (val) => {
    if (val === 0) return "(Rate this course)";
    if (val <= 2) return "(Poor/Fair)";
    if (val <= 3) return "(Average/Good)";
    return "(Good/Amazing)";
  };

  return (
    <div className="w-full max-w-lg mx-auto overflow-hidden">
      <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100 bg-white">
        <h2 className="text-[#093332] text-md font-bold">Write a Review</h2>
      </div>

      <div className="p-6 md:p-10 flex flex-col items-center bg-white/95 backdrop-blur-sm rounded-b-lg shadow-lg">

        <div className="mb-4 flex items-center gap-2">
          <span className="text-2xl font-bold text-[#093332]">
            {(hover || rating || 0).toFixed(1)}
          </span>
          <span className="text-gray-500 font-medium text-sm">
            {getRatingText(hover || rating)}
          </span>
        </div>

        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              className="cursor-pointer transition-transform hover:scale-110 outline-none"
            >
              <svg 
                width="36" 
                height="36" 
                viewBox="0 0 24 24" 
                fill={star <= (hover || rating) ? "#FF782D" : "none"} 
                stroke={star <= (hover || rating) ? "#FF782D" : "#D1D5DB"}
                strokeWidth="1.5"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
          ))}
        </div>

        <div className="w-full space-y-2 text-left">
          <label className="text-sm font-bold text-[#093332] block ml-0.5">
            Feedback
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write down your feedback here..."
            className="w-full h-32 p-4 bg-[#F4F7F7] border-none rounded-md outline-none text-[#093332] placeholder:text-[#638483] resize-none text-sm focus:ring-1 focus:ring-orange-200 transition-all"
          />
        </div>

        <div className="w-full mt-10 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="text-[#093332] font-bold text-sm hover:opacity-70 transition-opacity cursor-pointer"
          >
            Cancel
          </button>
          
          <button 
            onClick={handleSubmit}
            disabled={rating === 0}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-sm text-white font-bold text-sm transition-all active:scale-95
              ${rating === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-[#FF6A35] hover:bg-[#ef5d2a] shadow-md shadow-orange-100"}`}
          >
            Submit Review
            <Send size={18} fill="white" className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}