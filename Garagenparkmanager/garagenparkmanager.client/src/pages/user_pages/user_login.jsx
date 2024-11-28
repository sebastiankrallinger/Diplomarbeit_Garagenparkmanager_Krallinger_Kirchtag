import React from 'react';
import './user_login.css';

function user_login() {
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
                    <button type="submit" className="loginButton">Anmelden</button>
                </form>
                <div className="registerSection">
                    <p>Du hast noch kein Konto?</p>
                    <button className="registerButton">Registrieren</button>
                </div>
            </div>

            {/* Rechtes Bild oben */}
            <div className="topRightImage">
                <img src="../../src/assets/logo_Lagerage.png" alt="Rechteckiges Bild" />
            </div>
        </div>
    );
}

export default user_login;
