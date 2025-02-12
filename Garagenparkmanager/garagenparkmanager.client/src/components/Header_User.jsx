/* Header-Component*/
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import logo from '../assets/logo_Lagerage.png';
import Cookies from 'js-cookie';
import './Header.css';

function Header() {  
    const navigate = useNavigate(); 
    const { user, logout } = useContext(AuthContext);

    const handleNavigation = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
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
                        <a onClick={() => handleNavigation('news')}>News</a>
                        <a onClick={() => handleNavigation('storages')}>Immobilien</a>
                        <a onClick={() => handleNavigation('ueberUns')}>&Uuml;ber Uns</a>
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
