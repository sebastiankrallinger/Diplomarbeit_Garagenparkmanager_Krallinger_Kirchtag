import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Keycloak from 'keycloak-js';
import Home from './pages/Home';
import Mainpage_User from './pages/Mainpage_User';
import Mainpage_Admin from './pages/pages_admin/Mainpage_Admin';
import Usermanagement from './pages/pages_admin/Usermanagement';
import Objectmanagement from './pages/pages_admin/Objectmanagement';
import Newsmanagement from './pages/pages_admin/Newsmanagement';
import Documentmanagement from './pages/pages_admin/Documentmanagement';
import './index.css';

function App() {
    const [keycloak, setKeycloak] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const keycloak = new Keycloak({
            url: 'http://localhost:8080',
            realm: 'Garagenparkmanager',
            clientId: 'garagenparkmanager-aspnet-client',
        });

        keycloak.init({ onLoad: 'login-required'})
            .then(authenticated => {
                setKeycloak(keycloak);
                setAuthenticated(authenticated);
            })
            .catch(() => {
                console.log("Keycloak initialization failed");
            });
    }, []);

    if (keycloak) {
        if (authenticated) {
            window.location.href = '/user';

        } else {
            keycloak.login();
        }
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/user" element={<Mainpage_User />} />
                <Route path="/admin" element={<Mainpage_Admin />} />
                <Route path="/admin/usermanagement" element={<Usermanagement />} />
                <Route path="/admin/objectmanagement" element={<Objectmanagement />} />
                <Route path="/admin/newsmanagement" element={<Newsmanagement />} />
                <Route path="/admin/documentmanagement" element={<Documentmanagement />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
