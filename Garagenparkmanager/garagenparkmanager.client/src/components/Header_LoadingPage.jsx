/* Header_LoadingPage-Component*/

import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_Lagerage.png';
import './Header.css';

function Header() {  
    const navigate = useNavigate(); 
    const handleNavigation = (route) => {
        navigate(route);
    };
    return (  
        <header>
            <div className="header-container">
                <div className="header-logo">
                    <img src={logo} alt="logo_Lagerage" />
                </div>
                <nav className="header-navbar">
                    <ul>
                        <a onClick={() => handleNavigation('')}>News</a>
                        <a onClick={() => handleNavigation('')}>Immobilien</a>
                        <a onClick={() => handleNavigation('')}>&Uuml;ber Uns</a>
                        <button>Anmelden</button>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
