import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./pages/auth/ProtectedRoutes";
// import { Navigate } from "react-router-dom";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Admin from "./pages/Admin";  
import User from "./pages/User";

import "./pages/auth/styling.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>  
        }/>

        <Route path="/user" element={
          <ProtectedRoute>
            <User/>
          </ProtectedRoute>
        }/>

      </Routes>
    </Router>
  );
}