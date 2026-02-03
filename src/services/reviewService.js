import axios from 'axios';

const BASE_URL = 'https://edunexa.runasp.net/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
};

export async function submitReview(reviewData) {
    const response = await axios.post(`${BASE_URL}/Review/submit`, reviewData, {
        headers: getAuthHeaders()
    });
    return response.data;
}

export async function deleteReview(reviewId) {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${BASE_URL}/Review/DeleteReview/${reviewId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
}

export async function getCourseReviews(courseId) {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${BASE_URL}/Review/GetReviewsByCourse/${courseId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}