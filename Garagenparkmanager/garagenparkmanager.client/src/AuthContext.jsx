import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const accesstoken = localStorage.getItem('accesstoken');
        if (accesstoken) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (accesstoken, email, role) => {
        localStorage.setItem('accesstoken', accesstoken);
        localStorage.setItem('email', email);
        localStorage.setItem('role', role);
        setIsAuthenticated(true);
        setUser({ email, role }); 
    };

    const logout = () => {
        localStorage.removeItem('accesstoken');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
