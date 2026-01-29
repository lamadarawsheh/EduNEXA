import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VideoPage from "./ActiveTabs/VideoPage.jsx";
import LessonInfo from "./ActiveTabs/LessonInfo.jsx";
import ActiveTab from "./ActiveTabs/ActiveTabs.jsx";
import CourseContent from "./CourseContent.jsx";
import { ArrowLeft } from "lucide-react";

const initialComments = [
  { id: 1, user: "Ronald Richards", time: "1 week ago", avatar: "/image/A1.PNG", text: "Maecenas risus tortor, tincidunt nec purus eu, gravida suscipit tortor.", replies: [] },
  { id: 2, user: "Guy Hawkins", time: "2 weeks ago", avatar: "/image/A1.PNG", text: "Thank you for your helpful video.", replies: [] },
];

export default function WatchLesson() {
  const navigate = useNavigate();
  const location = useLocation();
  const lessonTitle = location.state?.title || "Select a Lesson";

  const [comments, setComments] = useState(initialComments);
  const [rating, setRating] = useState(4.8);
  const [hasRated, setHasRated] = useState(false);

  const handleAddComment = (text, userRating = null) => {
    if (!text.trim()) return;

    const newComment = {
      id: Date.now() + Math.random(), 
      user: "You",
      time: "Just now",
      avatar: "/image/A4.PNG", 
      text: text, 
      rating: userRating,
      replies: []
    };

    setComments(prevComments => [newComment, ...prevComments]);

    if (userRating !== null) {
      setRating(prev => {
        const totalRatingsCount = 155;
        return parseFloat(((prev * (totalRatingsCount - 1) + userRating) / totalRatingsCount).toFixed(1));
      });
      setHasRated(true);
    }
  };

  const handleAddReply = (commentId, replyText) => {
    if (!replyText.trim()) return;
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...(comment.replies || []),
              {
                id: Date.now() + Math.random(),
                user: "You",
                time: "Just now",
                avatar: "/image/A4.PNG",
                text: replyText
              }
            ]
          };
        }
        return comment;
      })
    );
  };

  const courseData = [
    {
      week: 1,
      title: "Introduction to UI/UX Design",
      lessons: [
        { id: "01", title: "Understanding UI/UX Design Principles", duration: "45 Minutes" },
        { id: "02", title: "Importance of User-Centered Design", duration: "1 Hour", isActive: true },
        { id: "03", title: "The Role of UI/UX Design in Product Development", duration: "45 Minutes" },
      ]
    },
     {
      week: 2,
      title: "User Research and Analysis",
      lessons: [
        { id: "01", title: "Conducting User Research and Interviews", duration: "1 Hour" },
        { id: "02", title: "Analyzing User Needs and Behavior", duration: "1 Hour" },
        { id: "03", title: "Creating User Personas and Scenarios", duration: "45 Minutes" },
      ]
    },
    {
      week: 3,
      title: "Wireframing and Prototyping",
      lessons: [
        { id: "01", title: "Introduction to Wireframing Tools and Techniques", duration: "1 Hour" },
        { id: "02", title: "Creating Low-Fidelity Wireframes", duration: "1 Hour" },
        { id: "03", title: "Prototyping and Interactive Mockups", duration: "1 Hour" },
      ]
    },
    {
      week: 4,
      title: "Visual Design and Branding",
      lessons: [
        { id: "01", title: "Color Theory and Typography in UI Design", duration: "1 Hour" },
        { id: "02", title: "Visual Hierarchy and Layout Design", duration: "1 Hour" },
        { id: "03", title: "Creating a Strong Brand Identity", duration: "45 Minutes" },
      ]
    },
    {
      week: 5,
      title: "Usability Testing and Iteration",
      lessons: [
        { id: "01", title: "Usability Testing Methods and Techniques", duration: "1 Hour" },
        { id: "02", title: "Analyzing Usability Test Results", duration: "45 Minutes" },
        { id: "03", title: "Iterating and Improving UX Designs", duration: "45 Minutes" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfd]">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-start gap-6 p-4 lg:p-8">
        <div className="w-full lg:flex-1 flex flex-col bg-white rounded-2xl">
          <div className="pb-4 flex items-center">
            <button onClick={() => navigate("/student/course-lessons")}
              className="flex items-center gap-2 text-[#176D69] font-bold hover:opacity-70 transition-all cursor-pointer group">
              <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">Back to My Courses</span>
            </button>
          </div>

          <div className="w-full bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video">
            <VideoPage />
          </div>

          <div className="py-6 sm:py-8">
            <div className="w-full">
              <LessonInfo 
                title={lessonTitle} 
                commentCount={comments.length} 
                rating={rating} 
                onNewReview={handleAddComment}
                hasRated={hasRated}
              />
              <div className="mt-8 border-t border-gray-100 pt-8">
                <ActiveTab 
                  comments={comments} 
                  onAddComment={handleAddComment} 
                  onAddReply={handleAddReply} 
                />
              </div>
            </div>
          </div>
        </div>
            <CourseContent
              courseData={courseData} 
              currentLessonTitle={lessonTitle}
            />
          
      

      </div>
    </div>
  );
}