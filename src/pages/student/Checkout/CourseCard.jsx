import UX from "./images/UX.png"
import star from"./images/Frame.png"
import student from"./images/Frame (1).png"
import hour from"./images/Frame (2).png"
export default function CourseCard() {
  return (
    <div className="bg-white text-black rounded-xl p-6 shadow">
      <h3 className="text-xl font-semibold mb-4">Course</h3>
              <div>
               <img src={UX} alt="ux image" />
               <div>
                <h2 className="mt-4 font-semibold">
                UI/UX Design Course
                </h2>
                <p className="text-gray-400 font-thin text-xs my-2">This comprehensive program will equip you with the knowledge and skills to create exceptional user interfaces (UI) and enhance user experiences (UX).</p>
                <div className="flex my-1">
                   <span className="pe-4"><img src={star} alt="Star Icon"/></span>
                   <span className="pe-4"><img src={student} alt="Student Icon"/></span>
                   <span className="pe-4"><img src={hour} alt="Hour Icon"/></span>
                </div>
                <div>
                  <span className="bg-gray-100 p-1 rounded-2xl">Beginner to Advanced</span>
                  <span className="ps-2"><span className="text-gray-400">Instructor:</span>Sarah Johnson</span>
                </div>
               </div>
              </div>
    </div>
  );
}
