import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importiere den useNavigate-Hook
import './user_login.css';

function UserLogin() {
    const navigate = useNavigate(); // Initialisiere den Navigations-Hook

    const handleLogin = (e) => {
        e.preventDefault(); // Verhindert Standardformularverhalten
        navigate('/user'); // Navigiere zur /user-Seite
    };

    const handleRegister = () => {
        navigate('/user/register'); // Navigiere zur /user/register-Seite
    };

    return (
        <div className="loginPage">
            {/* Hintergrundbild */}
            <div className="backgroundImage"></div>

            {/* Grauer Bereich im linken Drittel */}
            <div className="loginFormContainer">
                <h1>Bei Ihrem Konto anmelden</h1>
                <form className="loginForm">
                    <div className="formGroup">
                        <label htmlFor="email">E-Mail</label>
                        <input type="email" id="email" name="email" placeholder="E-Mail eingeben" />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="password">Passwort</label>
                        <input type="password" id="password" name="password" placeholder="Passwort eingeben" />
                    </div>
                    <div className="formOptions">
                        <div className="checkboxGroup">
                            <input type="checkbox" id="staySignedIn" />
                            <label htmlFor="staySignedIn">Angemeldet bleiben</label>
                        </div>
                        <a href="/forgot-password" className="forgotPassword">Passwort vergessen?</a>
                    </div>
                    <button
                        type="submit"
                        className="loginButton"
                        onClick={handleLogin} // F�ge Navigation f�r Anmelden hinzu
                    >
                        Anmelden
                    </button>
                </form>
                <div className="registerSection">
                    <p>Du hast noch kein Konto?</p>
                    <button
                        className="registerButton"
                        onClick={handleRegister} // F�ge Navigation f�r Registrieren hinzu
                    >
                        Registrieren
                    </button>
                </div>
            </div>

            {/* Rechtes Bild oben */}
            <div className="topRightImage">
                <img src="../../src/assets/logo_Lagerage.png" alt="Rechteckiges Bild" />
            </div>
        </div>
    );
}

export default UserLogin;
