/**
 * Course Service
 * Handles all API calls related to courses.
 * (To be connected with the backend later)
 */

export const getCourses = async () => {
    // return axios.get('/api/courses');
    console.log("Fetching courses...");
    return [];
};

export const createCourse = async (courseData) => {
    // return axios.post('/api/courses', courseData);
    console.log("Creating course:", courseData);
    return { success: true };
};
