﻿import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_Lagerage.png';
import './Header.css';

function Header() {
    const navigate = useNavigate();
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
            section.scrollIntoView({ behavior: 'smooth'});
            setActiveSection(id);
        }
    };

    //aktuelle Sektion abrufen
    const getCurrentSection = () => {
        const sections = ['content', 'plan', 'ueberUns'];
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

    //auf Login-Seite leiten
    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/login');
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
