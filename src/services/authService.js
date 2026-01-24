import api from "./api";

/**
 * Auth Service
 * Handles login, logout, and forgot password.
 */

// login
export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        console.log("Login Response Data:", response.data);

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

// logout
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log("Logging out user...");
};

// forgotPassword
export const forgotPassword = async (email) => {
    try {
        const response = await api.post(
            "http://edunexa.runasp.net/api/auth/forgot",
            { email }
        );

        console.log("Forgot Password Response:", response.data);
        return response.data;

    } catch (error) {
        console.error("Forgot Password Error:", error);
        throw error;
    }
};

// verifyCode
export const verifyCode = async (email, code) => {
    try {
        const response = await api.post(
            "http://edunexa.runasp.net/api/password/verify-code",
            { email, code }
        );

        console.log("Verify Code Response:", response.data);
        return response.data;

    } catch (error) {
        console.error("Verify Code Error:", error);
        throw error;
    }
};
// Reset password API call
export const resetPassword = async (newPassword, confirmPassword) => {
    try {
        const response = await api.post(
            "http://edunexa.runasp.net/api/password/reset",
            {
                NewPassword: newPassword,
                ConfirmPassword: confirmPassword
            }
        );

        console.log("Reset Password Response:", response.data);
        return response.data;

    } catch (error) {
        console.error("Reset Password Error:", error);
        throw error;
    }
};


