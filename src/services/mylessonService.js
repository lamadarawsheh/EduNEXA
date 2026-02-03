import api from './api';

export const BaseURL = "/proxy/api";

export const isWorkingUrl = (url) => {
    return url && typeof url === 'string' && url.trim() !== '' && url !== 'string' && url !== 'null';
};

export const formatDuration = (duration) => {
    if (!duration || duration === '00:00:00') return '0 mins';
    const parts = duration.split(':');
    const hours = parseInt(parts[0]) || 0;
    const minutes = parseInt(parts[1]) || 0;

    if (hours > 0) return `${hours} hr ${minutes} mins`;
    return `${minutes} mins`;
};

export const formatRelativeDate = (dateString) => {
    if (!dateString) return 'Recently';

    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} days ago`;

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

export const getCourseDetails = (courseId) => api.get(`/courses/${courseId}`);

export const getCourseSections = (courseId) => api.get(`/section/course/${courseId}`);

export const getSectionLectures = (sectionId) => api.get(`/Lecture/section/${sectionId}`);

export const getApprovedCourses = () => api.get('/courses');

export const isStudentEnrolled = (courseId) => api.get(`/Student/is-enrolled/${courseId}`);