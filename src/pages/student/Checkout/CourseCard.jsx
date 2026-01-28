import React from "react";
import profileicon from "./Icons/profile.svg"; 
import clockicon from "./Icons/clock.svg";
import staricon from "./Icons/star.svg";

export default function CourseCard({ data, isLoading }) {

  if (isLoading) {
    return (
      <div className="w-full max-w-[843px] animate-pulse border border-gray-100 rounded-2xl p-6 bg-white">
        <div className="w-full h-[300px] bg-gray-200 rounded-xl mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }
  const BASE_URL = "http://edunexa.runasp.net";


 const getValidImage = (imgUrl) => {
    if (!imgUrl || imgUrl === "test.png") {
      return "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"; 
    }
    if (imgUrl.startsWith('http')) return imgUrl;
    return `${BASE_URL}/Resources/Images/${imgUrl}`; 
  };
  if (!data) return null;

  return (
    <div className="w-full max-w-[843px]  bg-white border border-borderGray rounded-2xl p-6 sm:p-8 mx-auto shadow-sm">
      
      <div className="p-2 sm:p-2 pb-0">
       <img
          src={getValidImage(data.thumbnailUrl)}
          alt={data.title}
          className="w-full max-h-[480px] object-cover rounded-xl border border-gray-50"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/800x450?text=ASP.NET+Core+Course";
          }}
        />
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        <div>
          <h2 className="text-[#18181B] text-xl sm:text-2xl font-bold mb-2">
            {data.title}
          </h2>
          <p className="text-[#71717A] text-sm leading-relaxed">
            {data.shortDescription}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 py-2 border-y border-gray-50">
          <div className="flex items-center gap-1.5">
            <img src={staricon} className="w-4 h-4" alt="rating" />
            <span className="text-sm font-bold">{data.rating || "4.5"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <img src={profileicon} className="w-4 h-4" alt="students" />
            <span className="text-sm text-[#71717A]">{data.enrollmentCount || "0"} students</span>
          </div>
          <div className="flex items-center gap-1.5">
            <img src={clockicon} className="w-4 h-4" alt="duration" />
            <span className="text-sm text-[#71717A]">{data.estimatedDuration || "Self-paced"}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="bg-[#F4F4F5] text-[#18181B] px-3 py-1 rounded text-xs font-semibold border border-gray-200">
            {data.level || "Beginner"}
          </span>
          <p className="text-sm">
            <span className="text-[#71717A]">Instructor: </span>
            <span className="text-black font-semibold">{data.instructorName || "Admin"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}