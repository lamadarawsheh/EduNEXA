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


import axios from "axios";

/**
 * Course Service
 * Handles all API calls related to courses
 */

const API_URL = "http://edunexa.runasp.net/api";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlZGM3ZmZkYS01NWMzLTRkNTAtYTUxMy1hNzE5MmFiNjM1NzgiLCJlbWFpbCI6IlNlbWEyQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoic2VtYTIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdHVkZW50Iiwicm9sZSI6IlN0dWRlbnQiLCJleHAiOjE3Njg5MjA0NjEsImlzcyI6IlNlY3VyZUFwaSIsImF1ZCI6IlNlY3VyZUFwaVVzZXIifQ.wCQMw3xf-GtR8ACk8QZU3wsWxJ01XfPS67OQUjseybI";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

/* ================= Get Approved Courses ================= */
export const getApprovedCourses = () => {
  return axios.get(`${API_URL}/courses/approved`, { headers });
};
