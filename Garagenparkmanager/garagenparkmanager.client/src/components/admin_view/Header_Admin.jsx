import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import logo from '../../assets/logo_Lagerage.png';
import '../Header.css';

/* Header_Admin-Component*/
function Header() {  
    const navigate = useNavigate(); 
    const { user, logout } = useContext(AuthContext);

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
                        <a onClick={() => handleNavigation('/admin')}>Dashboard</a>
                        <a onClick={() => handleNavigation('/admin/newsmanagement')}>News</a>
                        <a onClick={() => handleNavigation('/admin/objectmanagement')}>Objektverwaltung</a>
                        {/* {console.log(user)} */}
                        {user.role === 0 && (
                            <a onClick={() => handleNavigation('/admin/adminmanagement')}>Adminverwaltung</a>
                        )}
                        <a onClick={() => handleNavigation('/admin/usermanagement')}>Benutzerverwaltung</a>
                        <a onClick={() => handleNavigation('/admin/documentmanagement')}>Dokumente</a>
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
