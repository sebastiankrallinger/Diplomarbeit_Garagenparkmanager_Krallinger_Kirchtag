import React, { createContext, useState } from 'react';

/* Authentifizierung mit Tokens */
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const initialAuthState = localStorage.getItem('accesstoken') !== null;
    const [isAuthenticated, setIsAuthenticated] = useState(initialAuthState);
    const [user, setUser] = useState({
        email: localStorage.getItem('email') || null,
        role: localStorage.getItem('role') || null
    });

    // Logindaten speichern & Authentifizieren
    const login = (accesstoken, email, role) => {
        console.log(accesstoken);
        localStorage.setItem('accesstoken', accesstoken);
        localStorage.setItem('email', email);
        localStorage.setItem('role', role);
        setIsAuthenticated(true);
        setUser({ email, role });
    };

    // Accesstoken entfernen und ausloggen
    const logout = () => {
        localStorage.removeItem('accesstoken');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
