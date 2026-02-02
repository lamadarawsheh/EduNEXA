import React, { useState } from "react";
import { Send, Loader2, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { submitNewReview } from "../../ReduxToolkit/Slices/ReviewSlice";
import Swal from "sweetalert2";

export default function WriteReviewModal({ onClose, courseId, studentId }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (rating === 0 || !feedback.trim()) {
      Swal.fire({ icon: 'warning', title: 'Selection Required', text: 'Please rate and write feedback.', confirmButtonColor: '#FF6A35' });
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(submitNewReview({ courseId, studentId, reviewText: feedback, rating })).unwrap();
      Swal.fire({ icon: 'success', title: 'Submitted!', showConfirmButton: false, timer: 1500, toast: true, position: 'top-end' });
      onClose();
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Failed', text: err.message || "Server Error", confirmButtonColor: '#d33' });
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl overflow-hidden shadow-none">
      <div className="p-8 flex flex-col items-center">
        <h2 className="text-[#093332] text-xl font-bold mb-4">Write a Review</h2>
        
        <div className="flex flex-col items-center mb-6">
          <span className="text-4xl font-black text-[#093332]">{(hover || rating).toFixed(1)}</span>
          <span className="text-[#FF6A35] text-xs font-bold uppercase tracking-widest mt-1">
             {rating > 0 ? "Thanks for rating!" : "Rate this course"}
          </span>
        </div>

        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              className="transition-transform  active:scale-90"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" 
                fill={star <= (hover || rating) ? "#FF782D" : "none"} 
                stroke={star <= (hover || rating) ? "#FF782D" : "#D1D5DB"} strokeWidth="1.5">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
          ))}
        </div>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Tell us about your experience..."
          className="w-full h-32 text-black p-4 bg-[#F4F7F7] rounded-xl outline-none focus:ring-1 focus:ring-orange-200 text-sm resize-none"
        />

        <div className="w-full mt-8 flex justify-between items-center">
          <button onClick={onClose} className="text-gray-400 font-bold text-sm">Cancel</button>
          <button 
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all ${rating === 0 || isSubmitting ? "bg-gray-200" : "bg-[#FF6A35] hover:bg-[#ef5d2a]"}`}
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
}