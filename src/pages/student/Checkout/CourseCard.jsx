import courseImage from "./images/Frame (3).png";
import profileicon from "./Icons/profile.svg";
import clockicon from "./Icons/clock.svg";
import staricon from "./Icons/star.svg";

export default function CourseCard() {
  return (
    <div className="bg-white border border-borderGray rounded-2xl overflow-hidden transition-all max-w-[843px] mx-auto lg:mx-0">
      
      <div className="relative p-4 sm:p-6">
        <img
          src={courseImage}
          alt="Course Thumbnail"
          className="w-full max-h-[460px] object-cover rounded-xl"
        />
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        <div>
          <h2 className="text-primetext text-xl sm:text-2xl lg:text-3xl mb-2">
            UI/UX Design Course
          </h2>
          <p className="text-smallText text-sm sm:text-base leading-relaxed">
            This comprehensive program will equip you with the knowledge and skills to create exceptional user interfaces (UI) and enhance user experiences (UX).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-1.5">
            <img src={staricon} className="w-4 h-4" />
            <span className="text-sm text-primetext">4.8</span>
          </div>

          <div className="flex items-center gap-1.5">
            <img src={profileicon} className="w-4 h-4" />
            <span className="text-sm text-smallText">12,543 students</span>
          </div>

          <div className="flex items-center gap-1.5">
            <img src={clockicon} className="w-4 h-4" />
            <span className="text-sm text-smallText">42 hours</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <span className="bg-[#F4F4F5] text-primetext px-4 py-1.5 rounded-md text-sm">
            Beginner to Advanced
          </span>
          <span className="text-sm">
            <span className="text-smallText">Instructor: </span>
            <span className="text-primetext">Sarah Johnson</span>
          </span>
        </div>
      </div>
    </div>
  );
}
