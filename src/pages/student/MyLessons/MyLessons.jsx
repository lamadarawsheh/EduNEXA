import VideoPage from "./VideoPage.jsx";
import LessonCard from "./LessonCard.jsx";
export default function MyLessons() {
    return (
         <div className="mx-w-[1440] overflow-hidden">
            <div className="overflow-hidden">
                <VideoPage />
            </div>
            <div className="overflow-hidden">
                <LessonCard />
            </div>
        </div>
    );
}