import api from "./api";

/**
 * Auth Service
 * Handles login, signup, and user session management.
 */

export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        console.log("Login Response Data:", response.data);

        // Assuming the response data contains the token and user info
        // The structure might vary based on your backend
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user || response.data));
        }

        return response.data;
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log("Logging out user...");
};
