import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * @param {Array} allowedRoles - List of roles that can access this route (e.g., ['Student', 'Instructor', 'Admin'])
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
    const location = useLocation();

    // Get token and user from localStorage
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    // 1. Check if user is logged in
    if (!token || !user) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 2. Check if roles are specified and if the user has the required role
    if (allowedRoles && allowedRoles.length > 0) {
        // Extract role from the roles array (backend usually returns a roles array)
        // Adjusting logic based on the response format seen in Login.jsx
        const userRoles = user.roles || [];
        const hasRequiredRole = allowedRoles.some(role =>
            userRoles.some(userRole => userRole.toLowerCase() === role.toLowerCase())
        );

        if (!hasRequiredRole) {
            // If user doesn't have the role, redirect based on their actual role or to unauthorized
            // For now, redirecting to their respective "home" or back to a safe spot
            const primaryRole = (userRoles.length > 0 ? userRoles[0] : '').toLowerCase();

            if (primaryRole === 'admin') return <Navigate to="/admin" replace />;
            if (primaryRole === 'instructor' || primaryRole === 'teacher') return <Navigate to="/teacher" replace />;
            if (primaryRole === 'student') return <Navigate to="/student" replace />;

            return <Navigate to="/choose" replace />;
        }
    }

    // 3. If everything is fine, render the children components
    return children;
};

export default ProtectedRoute;
