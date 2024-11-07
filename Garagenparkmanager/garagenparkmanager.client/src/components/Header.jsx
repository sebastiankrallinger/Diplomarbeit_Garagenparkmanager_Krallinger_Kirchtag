import React from 'react';
import logo from '../assets/logo_Lagerage.png';
import './Header.css';

function Header() {  
    return (  
        <header>
            <div className="header-container">
                <div className="header-logo">
                    <img src={logo} alt="logo_Lagerage" />
                </div>
                <nav className="header-navbar">
                    <ul>
                        <a onClick={() => window.location.href = '/pages/admin_pages/newsmanagement.html'}>News</a>
                        <a onClick={() => window.location.href = '/pages/admin_pages/objectmanagement.html'}>Objektverwaltung</a>
                        <a onClick={() => window.location.href = '/pages/admin_pages/usermanagement.html'}>Benutzerverwaltung</a>
                        <a onClick={() => window.location.href = '/pages/admin_pages/documentmanagement.html'}>Dokumente</a>
                        <a>sample_username</a>
                        <button>Abmelden</button>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
