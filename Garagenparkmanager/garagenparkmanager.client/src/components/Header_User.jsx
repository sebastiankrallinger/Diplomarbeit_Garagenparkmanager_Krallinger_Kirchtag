/* Header-Component*/
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import logo from '../assets/logo_Lagerage.png';
import Cookies from 'js-cookie';
import './Header.css';

function Header() {  
    const navigate = useNavigate(); 
    const { user, logout } = useContext(AuthContext);
    const [activeSection, setActiveSection] = useState('');

    const handleNavigation = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    //Token entfernen
    const handleLogout = () => {
        Cookies.remove('auth_token');
        logout();
        navigate('/home'); 
    };

    return (  
        <header>
            <div className="header-container">
                <div className="header-logo">
                    <img src={logo} alt="logo_Lagerage" />
                </div>
                <nav className="header-navbar">
                    <ul>
                        <a
                            onClick={() => handleNavigation('news')}
                            className={activeSection === 'news' ? 'active' : ''}
                        >
                            News
                        </a>
                        <a
                            onClick={() => handleNavigation('storages')}
                            className={activeSection === 'storages' ? 'active' : ''}
                        >
                            Immobilien
                        </a>
                        <a
                            onClick={() => handleNavigation('ueberUns')}
                            className={activeSection === 'ueberUns' ? 'active' : ''}
                        >
                            &Uuml;ber Uns
                        </a>
                        {user && (
                            <a>{user.email}</a>
                        )}
                        <button onClick={() => handleLogout()}>Abmelden</button>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
