/* Header_LoadingPage-Component*/

import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_Lagerage.png';
import './Header.css';

function Header() {  
    const navigate = useNavigate(); 

    const handleNavigation = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (  
        <header>
            <div className="header-container">
                <div className="header-logo">
                    <img src={logo} alt="logo_Lagerage" />
                </div>
                <nav className="header-navbar">
                    <ul>
                        <a onClick={() => handleNavigation('content')}>Immobilien</a>
                        <a onClick={() => handleNavigation('plan')}>Garagenpark</a>
                        <a onClick={() => handleNavigation('ueberUns')}>&Uuml;ber Uns</a>
                        <button onClick={handleLogin}>Anmelden</button>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
