import api from "./api";

export const BaseURL = "http://edunexa.runasp.net";

export const isWorkingUrl = (url) => {
    if (!url) return false;
    const lowerUrl = url.toLowerCase();

    // 1. Allow relative paths that follow the new storage structure
    if (lowerUrl.includes('/thumbnails/') || lowerUrl.includes('/trailers/')) {
        return true;
    }

    // 2. Allow absolute URLs that aren't from dummy domains (like example.com)
    if (url.startsWith('http') && !lowerUrl.includes('example.com')) {
        // Still filter out "test" files even if they are absolute
        if (lowerUrl.includes('test.png') || lowerUrl.includes('test.mp4')) return false;
        return true;
    }

    // 3. Reject everything else (old test data, missing folders, etc.)
    return false;
};

export const formatDuration = (duration) => {
    if (!duration) return "0 hrs";

    // If it's already formatted
    if (typeof duration === 'string' && (duration.includes('hrs') || duration.includes('mins'))) {
        return duration;
    }

    // If it's in HH:MM:SS format
    if (typeof duration === 'string' && duration.includes(':')) {
        const parts = duration.split(':');
        const hours = parseInt(parts[0]);
        const minutes = parseInt(parts[1]);

        if (hours > 0 && minutes > 0) return `${hours} hrs ${minutes} mins`;
        if (hours > 0) return `${hours} hrs`;
        if (minutes > 0) return `${minutes} mins`;
        return "0 hrs";
    }

    // If it's just a number
    return `${duration} hrs`;
};

/**
 * Course Service
 * Handles all API calls related to courses.
 */

/* ================= Get All Courses ================= */
export const getCourses = async () => {
    return api.get("/courses");
};

/* ================= Get Approved Courses ================= */
export const getApprovedCourses = () => {
    return api.get("/courses/approved");
};

/* ================= Get Newest Courses ================= */
export const getNewestCourses = () => {
    return api.get("/courses/newest");
};

/* ================= Get Popular Courses ================= */
export const getPopularCourses = () => {
    return api.get("/courses/popular");
};

/* ================= Get Categories & Subcategories ================= */
export const getCategoriesWithSubcategories = () => {
    // This endpoint returns categories with their subcategories
    return api.get("/Courses/categories");
};

/* ================= Get Single Category ================= */
export const getCategoryById = (id) => {
    return api.get(`/Category/${id}`);
};

/* ================= Get All SubCategories ================= */
export const getAllSubCategories = () => {
    return api.get("/SubCategory");
};

/* ================= Favorites ================= */
export const toggleCourseFavorite = (courseId) => {
    return api.post(`/favorite/toggle-course?courseId=${courseId}`);
};

export const toggleInstructorFavorite = (instructorId) => {
    return api.post(`/favorite/toggle-instructor?instructorId=${instructorId}`);
};

export const getFavoriteCourses = () => {
    return api.get("/favorite/courses");
};

export const getFavoriteInstructors = () => {
    return api.get("/favorite/instructors");
};

/* ================= Create Course ================= */
export const createCourse = async (courseData) => {
    return api.post("/courses", courseData);
};
