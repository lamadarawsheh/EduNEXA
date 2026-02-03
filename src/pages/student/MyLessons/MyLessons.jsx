import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VideoPage from "./VideoPage.jsx";
import LessonCard from "./LessonCard.jsx";
import { getCourseDetails, getCourseSections, getSectionLectures } from "../../../services/mylessonService";
import emptyProduct from './Images/emptyProduct.gif'
import { ArrowLeft } from 'lucide-react';

export default function MyLessons() {
  const location = useLocation();
  const courseId = location.state?.courseId;
  const [courseDetails, setCourseDetails] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      if (!courseId) return;

      try {
        setLoading(true);

        const courseRes = await getCourseDetails(courseId);
        setCourseDetails(courseRes.data);

        const secRes = await getCourseSections(courseId);
        const rawSections = secRes.data?.$values || secRes.data || [];

        const hydratedSections = await Promise.all(
          rawSections.map(async (sec) => {
            try {
              const lecRes = await getSectionLectures(sec.id);
              return {
                ...sec,
                lectures: lecRes.data?.$values || lecRes.data || []
              };
            } catch (error) {
              console.error(`Error loading lectures for section ${sec.id}`, error);
              return { ...sec, lectures: [] };
            }
          })
        );

        setSections(hydratedSections);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [courseId]);

  if (loading) return <div className="text-center py-20 font-bold text-[#0F4C4A]">Loading Classroom...</div>;

  if (!courseDetails && !loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center animate-fade-in">

        <div className="w-64 h-64 mb-6 opacity-80">
          <img
            src={emptyProduct}
            alt="No Data"
            className="w-full h-full object-contain"
          />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-[#08332e] mb-2">
          Oops! Content Unavailable
        </h2>
        <p className="text-gray-500 text-lg max-w-md leading-relaxed">
          We couldn't find any data for this course at the moment. Please try again later or contact support.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="mt-8 px-8 py-3 bg-[#176D69] text-white rounded-full font-semibold hover:bg-[#08332e] transition-all shadow-lg hover:shadow-xl"
        >
          Go Back
        </button>
      </div>
    );
  }
  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="px-8 py-3 lg:px-8 lg:pb-6 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className=" flex items-center gap-2 text-[#176D69] font-bold hover:opacity-70 transition-all cursor-pointer group"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to My Courses </span>
        </button>
      </div>
      <VideoPage course={courseDetails} />
      <LessonCard sections={sections} courseId={courseId} />
    </div>
  );
}