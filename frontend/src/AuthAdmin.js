import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Mock function to check if user is authenticated
const isAuthenticated = () => {
    console.log("eeres")
    // Check if token exists (you could also verify the token with an API call)
    const token = localStorage.getItem('jwt');
    console.log(token + " :token")
    return token ? true : false;
};

// Protected Route Component
const ProtectedRoute = () => {
    // If the user is not authenticated, redirect to the login page
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }
    console.log("auth")

    // If authenticated, allow access to the route
    return <Outlet />;
};

export default ProtectedRoute;
