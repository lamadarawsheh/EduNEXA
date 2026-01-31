import api from "./api";

/**
 * Dashboard Service
 */

// Get Instructor Dashboard Data
export const getInstructorDashboard = async () => {
    try {
        const response = await api.get('/Instructor/dashboard');
        return response.data;
    } catch (error) {
        console.error("Error fetching instructor dashboard:", error);
        throw error;
    }
};

// Get Instructor Reviews for charts and feedback
export const getInstructorReviews = async (instructorId) => {
    try {
        const response = await api.get(`/InstructorReview/GetInstructorReviews/${instructorId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching instructor reviews:", error);
        throw error;
    }
};
