import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import logo from '../../assets/logo_Lagerage.png';
import '../Header.css';

/* Header_Admin-Component*/
function Header() {  
    const navigate = useNavigate(); 
    const { user, logout } = useContext(AuthContext);
    const [activeLink, setActiveLink] = useState('');

    const handleNavigation = (route) => {
        navigate(route);
    };

    const getActiveClass = (route) => {
        return location.pathname === route ? 'active' : '';
    };

    return (  
        <header>
            <div className="header-container">
                <div className="header-logo">
                    <img src={logo} alt="logo_Lagerage" />
                </div>
                <nav className="header-navbar">
                    <ul>
                        <a onClick={() => handleNavigation('/admin')} className={getActiveClass('/admin')}>Dashboard</a>
                        <a onClick={() => handleNavigation('/admin/newsmanagement')} className={getActiveClass('/admin/newsmanagement')}>News</a>
                        <a onClick={() => handleNavigation('/admin/objectmanagement')} className={getActiveClass('/admin/objectmanagement')}>Objektverwaltung</a>
                        {/* {console.log(user)} */}
                        {user.role === 0 && (
                            <a onClick={() => handleNavigation('/admin/adminmanagement')} className={getActiveClass('/admin/adminmanagement')}>Adminverwaltung</a>
                        )}
                        <a onClick={() => handleNavigation('/admin/usermanagement')} className={getActiveClass('/admin/usermanagement')}>Benutzerverwaltung</a>
                        <a onClick={() => handleNavigation('/admin/documentmanagement')} className={getActiveClass('/admin/documentmanagement')}>Dokumente</a>
                        {user && (
                            <a>{user.email}</a>
                        )}
                        <button onClick={() => handleNavigation('/Home')}>Abmelden</button>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
