import React from "react";
import { BaseURL, isWorkingUrl } from "../../../services/courseService";

export default function VideoPage({ course }) {
  if (!course) {
    return (
      <div className="max-w-[1280px] w-full h-auto lg:h-[649px] mx-auto block p-4 sm:p-6 mb-2 rounded-3xl bg-gray-200 animate-pulse"></div>
    );
  }

  const thumbnailUrl = course.thumbnailUrl || course.image || course.imagePath || course.imageUrl;
  const safeThumbnailUrl = thumbnailUrl && isWorkingUrl(thumbnailUrl)
    ? (thumbnailUrl.startsWith('http') ? thumbnailUrl : `${BaseURL}/${thumbnailUrl.replace(/^\//, '')}`)
    : "/course_placeholder.png";

  return (
    <div className="max-w-[1280px] w-full mx-auto p-4 sm:p-6 mb-2">
      <img
        src={safeThumbnailUrl}
        alt={course.title || "Course Image"}
        className="w-full h-auto lg:h-[649px] object-cover rounded-3xl"
        onError={(e) => {
          e.target.src = "/course_placeholder.png";
        }}
      />
    </div>
  );
}
