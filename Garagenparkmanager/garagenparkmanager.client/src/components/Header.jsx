import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_Lagerage.png';
import './Header.css';

function Header() {
    const navigate = useNavigate();
    const [hidden, setHidden] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const handleNavigation = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth'});
            setActiveSection(id);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <header className={`header ${hidden ? 'hidden' : ''}`}>
            <div className="header-container">
                <div className="header-logo">
                    <img src={logo} alt="logo_Lagerage" />
                </div>
                <nav className="header-navbar">
                    <ul>
                        <a
                            onClick={() => handleNavigation('content')}
                            className={activeSection === 'content' ? 'active' : ''}
                        >
                            Immobilien
                        </a>
                        <a
                            onClick={() => handleNavigation('plan')}
                            className={activeSection === 'plan' ? 'active' : ''}
                        >
                            Garagenpark
                        </a>
                        <a
                            onClick={() => handleNavigation('ueberUns')}
                            className={activeSection === 'ueberUns' ? 'active' : ''}
                        >
                            &Uuml;ber Uns
                        </a>
                        <button onClick={handleLogin}>Anmelden</button>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
