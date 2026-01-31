import React from "react";
import profileicon from "./Icons/profile.svg";
import clockicon from "./Icons/clock.svg";
import staricon from "./Icons/star.svg";
import { BaseURL, isWorkingUrl, formatDuration } from "../../../services/courseService";

export default function CourseCard({ data, isLoading }) {

  if (isLoading || !data) {
    return (
      <div className="w-full max-w-[843px] animate-pulse border border-gray-100 rounded-2xl p-6 bg-white mx-auto">
        <div className="w-full h-[300px] bg-gray-200 rounded-xl mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  const imageUrl = data.thumbnailUrl || data.imagePath || data.imageUrl || data.image;

  const getValidImage = (imgUrl) => {
    if (imgUrl && isWorkingUrl(imgUrl)) {
      return imgUrl.startsWith('http') ? imgUrl : `${BaseURL}/${imgUrl.replace(/^\//, '')}`;
    }
    return "/course_placeholder.png";
  };

  return (
    <div className="w-full max-w-[843px] bg-white border border-[#E4E4E7] rounded-2xl p-6 sm:p-8 mx-auto shadow-sm">

      <div className="p-2 sm:p-2 pb-0">
        <img
          src={getValidImage(imageUrl)}
          alt={data.title}
          className="w-full max-h-[480px] object-cover rounded-xl border border-gray-50"
          onError={(e) => {
            e.target.src = "/course_placeholder.png";
          }}
        />
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        <div>
          <h2 className="text-[#18181B] text-xl sm:text-2xl font-bold mb-2">
            {data.title}
          </h2>
          <p className="text-[#71717A] text-sm leading-relaxed">
            {data.shortDescription || data.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 py-2 border-y border-gray-50">
          <div className="flex items-center gap-1.5">
            <img src={staricon} className="w-4 h-4" alt="rating" />
            <span className="text-sm font-bold">{data.rating || "4.5"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <img src={profileicon} className="w-4 h-4" alt="students" />
            <span className="text-sm text-[#71717A]">{data.enrollmentCount || data.studentCount || "0"} students</span>
          </div>
          <div className="flex items-center gap-1.5">
            <img src={clockicon} className="w-4 h-4" alt="duration" />
            <span className="text-sm text-[#71717A]">{formatDuration(data.estimatedDuration || "Self-paced")}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="bg-[#F4F4F5] text-[#18181B] px-3 py-1 rounded text-xs font-semibold border border-gray-200">
              {data.level || "Beginner"}
            </span>
            <p className="text-sm">
              <span className="text-[#71717A]">Instructor: </span>
              <span className="text-black font-semibold">{data.instructorName || "Admin"}</span>
            </p>
          </div>
          {data.categoryName && (
            <span className="text-[#A1A1AA] text-[10px] font-bold uppercase tracking-widest">
              {data.categoryName}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}