// src/services/courseService.js
import api from "./api";

// =====================
// Base URL
// =====================
export const BaseURL = "http://edunexa.runasp.net";

// =====================
// Helpers
// =====================
export const isWorkingUrl = (url) => {
    if (!url) return false;
    const lowerUrl = url.toLowerCase();

    if (
        lowerUrl.includes('thumbnails/') ||
        lowerUrl.includes('trailers/') ||
        lowerUrl.includes('uploads/') ||
        lowerUrl.includes('images/')
    ) {
        return true;
    }

    if (url.startsWith('http') && !lowerUrl.includes('example.com')) {
        if (lowerUrl.includes('test.png') || lowerUrl.includes('test.mp4')) return false;
        return true;
    }

    return false;
};

export const formatDuration = (duration) => {
    if (!duration) return "0 hrs";

    if (typeof duration === 'string' && (duration.includes('hrs') || duration.includes('mins'))) {
        return duration;
    }

    if (typeof duration === 'string' && duration.includes(':')) {
        const parts = duration.split(':');
        const hours = parseInt(parts[0]);
        const minutes = parseInt(parts[1]);

        if (hours > 0 && minutes > 0) return `${hours} hrs ${minutes} mins`;
        if (hours > 0) return `${hours} hrs`;
        if (minutes > 0) return `${minutes} mins`;
        return "0 hrs";
    }

    return `${duration} hrs`;
};

/* ===================== Courses API ===================== */
export const getCourses = async () => api.get("/courses");
export const getApprovedCourses = () => api.get("/courses/approved");
export const getNewestCourses = () => api.get("/courses/newest");
export const getPopularCourses = () => api.get("/courses/popular");

/* ===================== Categories API ===================== */
export const getCategoriesWithSubcategories = () => api.get("/Courses/categories");
export const getCategoryById = (id) => api.get(`/Category/${id}`);
export const getAllSubCategories = () => api.get("/SubCategory");

/* ===================== Favorites API ===================== */
export const toggleCourseFavorite = (courseId) => api.post(`/favorite/toggle-course?courseId=${courseId}`);
export const toggleInstructorFavorite = (instructorId) => api.post(`/favorite/toggle-instructor?instructorId=${instructorId}`);
export const getFavoriteCourses = () => api.get("/favorite/courses");
export const getFavoriteInstructors = () => api.get("/favorite/instructors");
export const isCourseFavorite = (courseId) => api.get(`/favorite/is-course-favorite?courseId=${courseId}`);
export const isInstructorFavorite = (instructorId) => api.get(`/favorite/is-instructor-favorite?instructorId=${instructorId}`);

/* ===================== Course Management ===================== */
export const createCourse = async (courseData) => api.post("/courses", courseData);
export const isStudentEnrolled = (courseId) => api.get(`/courses/${courseId}/is-enrolled`);

/* ===================== New: Open Courses Directly ===================== */
// Get full details of a single course
export const getCourseDetails = (courseId) => api.get(`/courses/${courseId}`);

// Get a specific lesson/video by courseId and lessonId
export const getLessonVideo = (courseId, lessonId) => api.get(`/courses/${courseId}/lessons/${lessonId}`);

// Get sections for a course
export const getCourseSections = (courseId) => api.get(`/courses/${courseId}/sections`);

// Get lectures for a section
export const getSectionLectures = (sectionId) => api.get(`/courses/sections/${sectionId}/lectures`);