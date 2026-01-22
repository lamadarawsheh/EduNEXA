import React, { useEffect, useState } from "react";

/* ================= Favorite Card Horizontal ================= */
const FavoriteCard = ({ course, reverse }) => {
  return (
    <div
      className={`bg-[#F2F2F2] text-white rounded-lg p-3 flex items-center gap-3 w-full md:w-[380px] text-sm ${
        reverse ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* الصورة */}
      <img
        src={course.image}
        alt={course.title}
        className="w-20 h-20 object-cover rounded"
      />

      {/* النصوص */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-sm  text-black">{course.title}</span>
          <span className="text-xs text-black">{course.level}</span>
          <span className="text-sm  text-black">{course.students} </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-black">50 video</span>
          <span className="text-xs text-black">{course.extra1 || "800 L.E"}</span>
        </div>
      </div>
    </div>
  );
};

/* ================= Favorites Page Horizontal ================= */
const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    if (saved.length === 0) {
      setFavorites([
        { title: "Web Development", description: "Learn HTML, CSS, JS", image: "/images/webdev.jpg", level: "Beginner", students: "2.5K", extra1: "Project Based", extra2: "Duration: 3mo" },
        { title: "React Mastery", description: "Become an expert in React", image: "/images/react.jpg", level: "Intermediate", students: "1.1K", extra1: "Hooks & Redux", extra2: "Duration: 2mo" },
        { title: "UI Design Patterns", description: "Learn reusable design patterns", image: "/images/design.jpg", level: "Advanced", students: "700", extra1: "Figma & XD", extra2: "Duration: 1mo" },
        { title: "Data Science", description: "Learn Python and Data Analysis", image: "/images/datascience.jpg", level: "Beginner", students: "1K", extra1: "Pandas & NumPy", extra2: "Duration: 3mo" },
      ]);
    } else {
      setFavorites(saved);
    }
  }, []);

  const half = Math.ceil(favorites.length / 2);
  const leftFavorites = favorites.slice(0, half);
  const rightFavorites = favorites.slice(half);

  return (
   <div className="px-4 py-10">
    {/* Header */}
     <div className="text-left mb-4  ">
  <h2 className="text-4xl font-bold mb-4 text-[#0F4C4A] ps-3 pb-5">My Favorite</h2>

</div>
  {favorites.length === 0 ? (
    <p className="text-center text-gray-500 text-lg">
      You have no favorite courses yet.
    </p>
  ) : (
    <div className="flex flex-col md:flex-row md:justify-center gap-6 relative">
        

      {/* ===== Left Column ===== */}
      <div className="flex flex-col gap-4">
        {/* العنوان فوق الخلفية */}
        <h1 className="text-3xl font-bold text-center text-[#0F4C4A] mb-2">
          Courses
        </h1>

        {/* الخلفية الشفافة الكبيرة للعمود */}
        <div className="relative flex flex-col gap-4 p-6   bg-gradient-to-b from-[#25ADA7]/30 to-[#25ADA7]/5">
          {leftFavorites.map((course, index) => (
            <FavoriteCard key={index} course={course} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full md:w-1 bg-black" />

      <div className="flex flex-col gap-4">
        {/* العنوان فوق الخلفية */}
        <h1 className="text-3xl font-bold text-center text-[#0F4C4A] mb-2">
          Mentors
        </h1>

        {/* الخلفية الشفافة الكبيرة للعمود */}
        <div className="relative flex flex-col gap-4 p-6   bg-gradient-to-b from-[#25ADA7]/30 to-[#25ADA7]/5">
          {rightFavorites.map((course, index) => (
            <FavoriteCard key={index} course={course} reverse />
          ))}
        </div>
      </div>

    </div>
  )}
</div>
  );
};

export default FavoritesPage;
