import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourse,
  setCurrentLessonTitle,
  completeLecture,
} from "../../../../ReduxToolkit/Slices/courseSlice/courseSlice";
import CourseContent from "../CourseContent.jsx";

export default function CoursePage({ courseId }) {
  const dispatch = useDispatch();
  const { course, sections, currentLessonTitle, loading } = useSelector(
    (state) => state.course
  );

  useEffect(() => {
    dispatch(fetchCourse(courseId));
  }, [courseId]);

  const currentLesson = sections
    .flatMap(s => s.lectures)
    .find(l => l.title === currentLessonTitle);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8">
        <h1 className="text-xl font-bold mb-4">{course?.title}</h1>

        {currentLesson && (
          <video
            key={currentLesson.id}
            controls
            className="w-full rounded"
            onEnded={() => dispatch(completeLecture(currentLesson.id))}
          >
            <source src={currentLesson.videoUrl} />
          </video>
        )}
      </div>

      <div className="col-span-4">
        <CourseContent
          courseData={sections}
          currentLessonTitle={currentLessonTitle}
          onLessonClick={(lesson) =>
            dispatch(setCurrentLessonTitle(lesson.title))
          }
        />
      </div>

    </div>
  );
}
