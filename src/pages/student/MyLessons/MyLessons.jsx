import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import VideoPage from "./VideoPage.jsx";
import LessonCard from "./LessonCard.jsx";
import { getCourseDetails, getCourseSections, getSectionLectures } from "../../../services/courseService";

export default function MyLessons() {
  const location = useLocation();
  const courseId = location.state?.courseId;
  const [courseDetails, setCourseDetails] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!courseId) {
        setLoading(false);
        return;
      }
      try {
        console.log("🔍 Fetching course details for courseId:", courseId);
        
        // Fetch course details first
        const courseResponse = await getCourseDetails(courseId);
        console.log("✅ Course Details Response:", courseResponse.data);
        console.log("📦 Course sections in response:", courseResponse.data?.sections);
        
        setCourseDetails(courseResponse.data);
        
        // Try to get sections from multiple sources
        let sectionsData = [];
        
        // 1. Try from courseResponse.data.sections (only if it has data)
        const sectionsFromResponse = courseResponse.data?.sections;
        const hasSections = sectionsFromResponse && Array.isArray(sectionsFromResponse) && sectionsFromResponse.length > 0;
        
        console.log("🔍 Checking sections:", {
          exists: !!sectionsFromResponse,
          isArray: Array.isArray(sectionsFromResponse),
          length: sectionsFromResponse?.length,
          hasSections: hasSections
        });
        
        if (hasSections) {
          sectionsData = sectionsFromResponse;
          console.log("✅ Found sections in courseResponse.data.sections:", sectionsData);
        } else {
          // 2. Try from separate sections API
          console.log("📡 Sections not found in courseResponse or empty, trying separate API...");
          try {
            const sectionsResponse = await getCourseSections(courseId);
            console.log("✅ Sections API Response:", sectionsResponse);
            console.log("📦 Sections Response Data:", sectionsResponse.data);
            
            const responseData = sectionsResponse.data;
            if (Array.isArray(responseData)) {
              sectionsData = responseData;
            } else if (responseData?.data && Array.isArray(responseData.data)) {
              sectionsData = responseData.data;
            } else if (responseData?.$values && Array.isArray(responseData.$values)) {
              sectionsData = responseData.$values;
            }
            console.log("✅ Parsed sections from API:", sectionsData);
          } catch (sectionsError) {
            console.warn("⚠️ Error fetching sections from API:", sectionsError);
            console.log("📋 Sections error details:", sectionsError.response?.data);
          }
        }
        
        console.log("🎯 Final sections to set:", sectionsData);
        console.log("📊 Sections count:", sectionsData.length);
        
        // Fetch lectures for each section
        if (sectionsData.length > 0) {
          console.log("📝 First section example:", sectionsData[0]);
          
          // Fetch lectures for all sections in parallel
          const sectionsWithLectures = await Promise.all(
            sectionsData.map(async (section) => {
              try {
                console.log(`📚 Fetching lectures for section ${section.id}:`, section.title);
                const lecturesResponse = await getSectionLectures(section.id);
                console.log(`✅ Lectures for section ${section.id}:`, lecturesResponse.data);
                
                // Handle different response formats
                let lectures = [];
                const lecturesData = lecturesResponse.data;
                if (Array.isArray(lecturesData)) {
                  lectures = lecturesData;
                } else if (lecturesData?.data && Array.isArray(lecturesData.data)) {
                  lectures = lecturesData.data;
                } else if (lecturesData?.$values && Array.isArray(lecturesData.$values)) {
                  lectures = lecturesData.$values;
                }
                
                return {
                  ...section,
                  lectures: lectures
                };
              } catch (error) {
                console.warn(`⚠️ Error fetching lectures for section ${section.id}:`, error);
                // Return section with empty lectures array if fetch fails
                return {
                  ...section,
                  lectures: section.lectures || []
                };
              }
            })
          );
          
          console.log("✅ Sections with lectures:", sectionsWithLectures);
          setSections(sectionsWithLectures);
        } else {
          // If no sections found, try to get lectures from all sections
          // This is a fallback: try to get lectures even if sections API doesn't return sections
          console.log("⚠️ No sections found, trying to get lectures from all possible sections...");
          
          // Try to get sections again and if they exist but were empty, try to get lectures
          // Or create a default section with lectures if we can find them
          try {
            // First, try to get sections one more time to make sure
            const sectionsResponse = await getCourseSections(courseId);
            const responseData = sectionsResponse.data;
            let finalSections = [];
            
            if (Array.isArray(responseData) && responseData.length > 0) {
              finalSections = responseData;
            } else if (responseData?.data && Array.isArray(responseData.data) && responseData.data.length > 0) {
              finalSections = responseData.data;
            } else if (responseData?.$values && Array.isArray(responseData.$values) && responseData.$values.length > 0) {
              finalSections = responseData.$values;
            }
            
            if (finalSections.length > 0) {
              // If we found sections now, fetch lectures for them
              console.log("✅ Found sections on retry:", finalSections);
              const sectionsWithLectures = await Promise.all(
                finalSections.map(async (section) => {
                  try {
                    console.log(`📚 Fetching lectures for section ${section.id}:`, section.title);
                    const lecturesResponse = await getSectionLectures(section.id);
                    console.log(`✅ Lectures for section ${section.id}:`, lecturesResponse.data);
                    
                    let lectures = [];
                    const lecturesData = lecturesResponse.data;
                    if (Array.isArray(lecturesData)) {
                      lectures = lecturesData;
                    } else if (lecturesData?.data && Array.isArray(lecturesData.data)) {
                      lectures = lecturesData.data;
                    } else if (lecturesData?.$values && Array.isArray(lecturesData.$values)) {
                      lectures = lecturesData.$values;
                    }
                    
                    return {
                      ...section,
                      lectures: lectures
                    };
                  } catch (error) {
                    console.warn(`⚠️ Error fetching lectures for section ${section.id}:`, error);
                    return {
                      ...section,
                      lectures: section.lectures || []
                    };
                  }
                })
              );
              
              console.log("✅ Sections with lectures (retry):", sectionsWithLectures);
              setSections(sectionsWithLectures);
            } else {
              console.log("📝 No sections available even after retry, setting empty array");
              setSections([]);
            }
          } catch (error) {
            console.warn("⚠️ Error in fallback:", error);
            setSections([]);
          }
        }
      } catch (error) {
        console.error("❌ Error fetching details:", error);
        console.error("Error details:", error.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [courseId]);

  if (loading) return <div className="text-center py-20 font-bold text-[#0F4C4A]">جاري تحميل الدروس...</div>;
  if (!courseDetails) return <div className="text-center py-20 text-gray-500">لم يتم العثور على بيانات الكورس.</div>;

  console.log("🎨 MyLessons render - sections:", sections);
  console.log("🎨 MyLessons render - sections length:", sections?.length);

  return (
    <div className="max-w-[1440px] mx-auto">
      <div>
        <VideoPage course={courseDetails} />
      </div>
      <div>
        <LessonCard sections={sections} />
      </div>
    </div>
  );
}
