import VideoPage from "./VideoPage.jsx";
import LessonCard from "./Weerks.jsx";
export default function MyLessons() {
    return (
         <div className="w-[1440] ml-20  ">
            <div className="py-6">
                <VideoPage />
            </div>
            <div className="">
                <LessonCard />
            </div>
        </div>
    );
}