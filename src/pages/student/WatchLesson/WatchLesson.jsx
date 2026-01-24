import VideoPage from "./ActiveTabs/VideoPage.jsx";
import LessonInfo from "./ActiveTabs/LessonInfo.jsx";

import ActiveTab  from "./ActiveTabs/ActiveTabs.jsx";
export default function WatchLesson() {
    return (
         <div className="w-[1440] ml-8  ">
            <div className="py-6">
                <VideoPage />
            </div>
            <div className="contecnt w-full flex justify-content-between">
                <div className="contentLeft w-[1002px]">
                    <div className="max-w-4xl mx-auto p-6 bg-white">
                    <LessonInfo />
                    <ActiveTab />
                    </div>
                </div>
                <div className="contentRight w-[500px] mt-55 mr-20">
                    <div className="border-b border-gray-950 pb-4 mb-6 flex justify-center gap-20">
                        <h2 className="text-lg text-gray-800">Course Contents</h2>
                        <p className="text-sm text-gray-800">15% Completed</p>
                    </div>
                </div>
            </div>
        </div>
    );
}