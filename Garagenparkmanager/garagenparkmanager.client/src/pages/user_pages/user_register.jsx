import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importiere den useNavigate-Hook
import './user_register.css';

function User_Register() {
    const navigate = useNavigate(); // Initialisiere den Navigations-Hook

    const handleRegister = (e) => {
        e.preventDefault(); // Verhindert Standardformularverhalten
        navigate('/user'); // Navigiere zur /user-Seite
    };

    return (
        <div className="user_register">
            {/* Hintergrundbild */}
            <div
                className="backgroundImage"
                style={{
                    backgroundImage: `url('../../src/assets/moon.jpeg')`, // Pfad zum Hintergrundbild
                }}
            ></div>

            {/* Linker Bereich: Grauer Streifen */}
            <div className="registerFormContainer">
                <h1>Registrieren</h1>
                <form className="registerForm">
                    <div className="formGroup">
                        <label htmlFor="firstname">Vorname</label>
                        <input type="text" id="firstname" name="firstname" placeholder="Vorname" />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="lastname">Nachname</label>
                        <input type="text" id="lastname" name="lastname" placeholder="Nachname" />
                    </div>
                    <div className="formRow">
                        <div className="formGroup">
                            <label htmlFor="zipcode">PLZ</label>
                            <input type="text" id="zipcode" name="zipcode" placeholder="PLZ" />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="city">Ort</label>
                            <input type="text" id="city" name="city" placeholder="Ort" />
                        </div>
                    </div>
                    <div className="formRow">
                        <div className="formGroup">
                            <label htmlFor="street">Straﬂe</label>
                            <input type="text" id="street" name="street" placeholder="Straﬂe" />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="houseNumber">HNr.</label>
                            <input type="text" id="houseNumber" name="houseNumber" placeholder="HNr." />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="co">c/o</label>
                            <input type="text" id="co" name="co" placeholder="c/o" />
                        </div>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="email">E-Mail</label>
                        <input type="email" id="email" name="email" placeholder="E-Mail" />
                    </div>
                    <div className="formRow">
                        <div className="formGroup">
                            <label htmlFor="companyName">Firmenname</label>
                            <input type="text" id="companyName" name="companyName" placeholder="Firmenname" />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="atuNumber">ATU-Nummer</label>
                            <input type="text" id="atuNumber" name="atuNumber" placeholder="ATU-Nummer" />
                        </div>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="password">Passwort</label>
                        <input type="password" id="password" name="password" placeholder="Passwort" />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="confirmPassword">Passwort best‰tigen</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Passwort best‰tigen" />
                    </div>
                    <div className="formOptions">
                        <div className="checkboxGroup">
                            <input type="checkbox" id="staySignedIn" />
                            <label htmlFor="staySignedIn">Angemeldet bleiben</label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="registerButton"
                        onClick={handleRegister} // F¸ge die Navigation zur /user-Seite hinzu
                    >
                        Registrieren
                    </button>
                </form>
            </div>

            {/* Bild in der oberen rechten Ecke */}
            <div className="topRightImage">
                <img src="../../src/assets/logo_Lagerage.png" alt="Rechteckiges Bild" />
            </div>
        </div>
    );
}

export default User_Register;
