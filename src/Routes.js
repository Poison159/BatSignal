import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

const AppRoutes = () => {
    
    let isAuthenticated = false;
    const localToken = localStorage.getItem('authToken');
    if(localToken !== "null"){
        isAuthenticated = true;
    }

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/home"
                element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
            />
            <Route 
                path="/*" 
                element={ isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
            />
        </Routes>
    );
};

export default AppRoutes;
