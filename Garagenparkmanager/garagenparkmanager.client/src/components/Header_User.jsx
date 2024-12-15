/* Header-Component*/
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import logo from '../assets/logo_Lagerage.png';
import './Header.css';

function Header() {  
    const navigate = useNavigate(); 
    const { user, logout } = useContext(AuthContext);

    const handleNavigation = (route) => {
        navigate(route);
    };

    const handleLogout = () => {
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
                        <a onClick={() => handleNavigation('')}>News</a>
                        <a onClick={() => handleNavigation('')}>Immobilien</a>
                        <a onClick={() => handleNavigation('')}>&Uuml;ber Uns</a>
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
