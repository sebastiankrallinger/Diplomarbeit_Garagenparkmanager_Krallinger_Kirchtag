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
                        <a onClick={() => handleNavigation('/admin/newsmanagement')}>News</a>
                        <a onClick={() => handleNavigation('/admin/objectmanagement')}>Objektverwaltung</a>
                        <a onClick={() => handleNavigation('/admin/usermanagement')}>Benutzerverwaltung</a>
                        <a onClick={() => handleNavigation('/admin/documentmanagement')}>Dokumente</a>
                        <a>sample_username</a>
                        <button>Abmelden</button>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
