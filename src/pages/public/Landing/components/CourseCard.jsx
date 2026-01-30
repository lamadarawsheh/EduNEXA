import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BaseURL, isWorkingUrl } from '../../../../services/courseService';

const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        Swal.fire({
            title: 'Login Required',
            text: 'Please log in first to access this feature.',
            icon: 'info',
            confirmButtonColor: '#0F4C4A',
        });
        return false;
    }
    return true;
};

const CourseCard = ({ id, title, students, level, imageUrl, instructor, rating, onClick }) => {
    const navigate = useNavigate();
    const fullImageUrl = (imageUrl && isWorkingUrl(imageUrl))
        ? (imageUrl.startsWith('http') ? imageUrl : `${BaseURL}/${imageUrl.replace(/^\//, '')}`)
        : "/course_placeholder.png";

    return (
        <div
            onClick={onClick}
            className="flex flex-col bg-white border border-transparent shadow-lg rounded-xl p-5 w-full group transition-all hover:shadow-2xl cursor-pointer"
        >
            <div className="relative overflow-hidden rounded-lg mb-4 h-40">
                <img
                    src={fullImageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    onError={(e) => { e.target.src = "/course_placeholder.png"; }}
                />
                <span className="absolute top-3 right-3 bg-white/90 px-2 py-px rounded-md text-[10px] font-bold text-[#0F4C4A]">{level}</span>
            </div>
            <div className="mb-2">
                <span className="text-[10px] font-bold text-[#4AA59B] uppercase tracking-wider">{instructor || "Expert Mentor"}</span>
            </div>
            <span className="text-[#0F172B] font-bold mb-2 text-left text-lg line-clamp-1">{title}</span>
            <p className="text-[#45556C] text-xs text-left mb-6 line-clamp-2">Advance your career with master-led learning and real-world projects.</p>
            <div className="flex justify-between w-full mt-auto text-[11px] text-gray-500 mb-4 font-medium">
                <span>👥 {students} Students</span>
                <span>⭐ {rating || "0"}</span>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    if (checkAuth()) {
                        navigate('/student/checkout', { state: { courseId: id } });
                    }
                }}
                className="bg-[#0F4C4A] text-white w-full py-2.5 rounded-lg hover:bg-[#0D3B36] transition-all font-bold"
            >
                Enroll Now
            </button>
        </div>
    );
};

export default CourseCard;
