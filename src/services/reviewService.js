import axios from 'axios';

const BASE_URL = 'http://edunexa.runasp.net/api';

export async function submitReview(reviewData) {
    const token = localStorage.getItem('token'); 

    const response = await axios.post(`${BASE_URL}/Review/submit`, reviewData, {
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

export async function getCourseReviews(courseId) {
    const response = await axios.get(`${BASE_URL}/GetReviewsByCourse/${courseId}`);
    return response.data; 
}

export async function deleteReview(reviewId) {
    const response = await axios.delete(`${BASE_URL}/DeleteReview/${reviewId}`);
    return response.data;
}