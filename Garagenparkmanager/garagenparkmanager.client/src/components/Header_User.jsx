/* Header-Component*/

import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import logo from '../assets/logo_Lagerage.png';
import Cookies from 'js-cookie';
import './Header.css';

function Header() {  
    const navigate = useNavigate(); 
    const { user, logout } = useContext(AuthContext);
    const [activeSection, setActiveSection] = useState('');
    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(window.scrollY);

    //Header ein-/ausklappen
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setIsScrollingUp(false);
            } else {
                setIsScrollingUp(true);
            }
            setLastScrollY(window.scrollY);
            const currentSection = getCurrentSection();
            if (currentSection) {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    //Header navbar Navigation
    const handleNavigation = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    //aktuelle Sektion abrufen
    const getCurrentSection = () => {
        const sections = ['news', 'storages', 'ueberUns'];
        for (let id of sections) {
            const section = document.getElementById(id);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 0 && rect.top < window.innerHeight / 3) {
                    return id;
                }
            }
        }
        return '';
    };

    //Token entfernen
    const handleLogout = () => {
        Cookies.remove('auth_token');
        logout();
        navigate('/home'); 
    };

    return (  
        <header className={isScrollingUp ? 'visible' : 'hidden'}>
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
