import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("SighnToken");
    
    const isAuthenticated = !!token;
    
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute
