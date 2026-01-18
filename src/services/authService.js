/**
 * Auth Service
 * Handles login, signup, and user session management.
 */

export const login = async (credentials) => {
    // const response = await axios.post('/api/auth/login', credentials);
    // localStorage.setItem('token', response.data.token);
    console.log("Logging in user:", credentials);
    return { user: { id: 1, name: 'Demo User' } };
};

export const logout = () => {
    // localStorage.removeItem('token');
    console.log("Logging out user...");
};
