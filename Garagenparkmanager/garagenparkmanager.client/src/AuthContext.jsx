import React, { createContext, useState, useEffect } from 'react';

/* Authentifizierung mit Tokens */

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); 

    //accestoken aus dem Localstorage laden
    useEffect(() => {
        const accesstoken = localStorage.getItem('accesstoken');
        if (accesstoken) {
            setIsAuthenticated(true);
        }
    }, []);

    //Logindaten speichern & Authentifizieren
    const login = (accesstoken, email, role) => {
        localStorage.setItem('accesstoken', accesstoken);
        localStorage.setItem('email', email);
        localStorage.setItem('role', role);
        setIsAuthenticated(true);
        setUser({ email, role }); 
    };

    //accesstoken entfernen und ausloggen
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
