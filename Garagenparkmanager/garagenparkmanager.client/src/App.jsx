import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Home from './pages/Home';
import Mainpage_Admin from './pages/pages_admin/Mainpage_Admin';
import Usermanagement from './pages/pages_admin/Usermanagement';
import Adminmanagement from './pages/pages_admin/Adminmanagement';
import Objectmanagement from './pages/pages_admin/Objectmanagement';
import Newsmanagement from './pages/pages_admin/Newsmanagement';
import Documentmanagement from './pages/pages_admin/Documentmanagement';
import Login from './pages/login';
import User_Mainpage from './pages/user_pages/user_mainpage';
import User_Register from './pages/user_pages/user_register';
import './index.css';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/admin" element={<Mainpage_Admin />} />
                    <Route path="/admin/usermanagement" element={<Usermanagement />} />
                    <Route path="/admin/adminmanagement" element={<Adminmanagement />} />
                    <Route path="/admin/objectmanagement" element={<Objectmanagement />} />
                    <Route path="/admin/newsmanagement" element={<Newsmanagement />} />
                    <Route path="/admin/documentmanagement" element={<Documentmanagement />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/user" element={<PrivateRoute><User_Mainpage /></PrivateRoute>} />
                    <Route path="/register" element={<User_Register />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
