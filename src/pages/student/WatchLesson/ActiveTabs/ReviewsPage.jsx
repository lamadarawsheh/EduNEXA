import React, { useState } from 'react';

const StarIcon = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "#FF782D" : "none"} stroke={filled ? "#FF782D" : "#D1D5DB"} strokeWidth="2">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default function ReviewsPage({ reviews, isLoading }) {
  const [visibleCount, setVisibleCount] = useState(5);
  const [isBtnLoading, setIsBtnLoading] = useState(false); 

  if (isLoading) return <div className="text-center py-10 text-[#176D69] font-bold">Loading...</div>;

  const handleLoadMore = () => {
    setIsBtnLoading(true);

    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + 5);
      setIsBtnLoading(false);
    }, 500);
  };

  const reversedReviews = reviews ? [...reviews].reverse() : [];
  const displayedReviews = reversedReviews.slice(0, visibleCount);

  return (
    <div className="w-full bg-white rounded-xl p-4 md:p-6 font-sans text-left">
      <h2 className="text-lg font-bold text-[#093332] mb-6 border-b pb-4">
        Student Reviews ({reviews?.length || 0})
      </h2>

      <div className="space-y-6">
        {displayedReviews.length > 0 ? (
          displayedReviews.map((item, index) => (
            <div key={item.id || index} className="flex gap-4 p-4 rounded-lg bg-[#F9FAFA] border border-gray-100 transition-all hover:bg-white hover:shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#176D69] flex items-center justify-center text-white font-bold shrink-0 shadow-inner">
                {(item.studentName || item.StudentName || "S").charAt(0).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-[#093332]">
                    {item.studentName || item.StudentName || "Verified Student"}
                  </h4>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} filled={star <= (item.rating || item.Rating || 0)} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-[15px] leading-relaxed break-words pr-2">
                  {item.reviewText || item.ReviewText || item.comment || item.Comment || "No content."}
                </p>
                <span className="text-[11px] text-gray-400 mt-2 block italic">
                  {item.createdAt || item.CreatedAt ? new Date(item.createdAt || item.CreatedAt).toLocaleDateString('en-GB') : "Recently"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-400">No reviews yet.</div>
        )}
      </div>

      {reviews && visibleCount < reviews.length && (
        <div className="mt-6 flex justify-start">
          <button
            onClick={handleLoadMore}
            disabled={isBtnLoading}
            className="flex items-center gap-2 py-2 text-[#176D69] font-bold hover:text-[#0e4b48] transition-colors disabled:opacity-50"
          >
            {isBtnLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-[#176D69] border-t-transparent rounded-full animate-spin"></span>
                Loading...
              </>
            ) : (
              "Read More"
            )}
          </button>
        </div>
      )}
    </div>
  );
}