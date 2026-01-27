import api from "./api";

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

/* ================= Create Course ================= */
export const createCourse = async (courseData) => {
    return api.post("/courses", courseData);
};

/* ================= Get Categories & Subcategories ================= */
export const getCategoriesWithSubcategories = () => {
    return api.get("/Courses/categories");
};
