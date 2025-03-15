import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../../AuthContext';
import Cookies from 'js-cookie';
import './user_register.css';
import logo from '../../assets/logo_Lagerage.png'

function User_Register() {
    const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    //const url = "https://localhost:7186/";
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        birthdate: '',
        zipcode: '',
        city: '',
        street: '',
        housenumber: '',
        co: '',
        email: '',
        companyName: '',
        atuNumber: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //Register-Verfahren
    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwörter stimmen nicht überein!');
            return;
        }

        const staySignedIn = document.getElementById('staySignedIn').checked;
        const data = {
            firstname: formData.firstname,
            lastname: formData.lastname,
            birthdate: formData.birthdate,
            plz: formData.zipcode,
            location: formData.city,
            street: formData.street,
            housenumber: formData.housenumber,
            housenumberAddition: formData.co || "",
            email: formData.email,
            companyName: formData.companyName || "",
            atuNumber: formData.atuNumber || "",
            password: formData.password
        };

        try {
            const response = await fetch(url + 'Account/registerCustomer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const data = await response.json();
                const userData = { email: formData.email };
                if (staySignedIn) {
                    Cookies.set('auth_token', data.accesstoken, { expires: 7, secure: true, sameSite: 'Strict' });
                }
                login(userData, data.email);
                {/*console.log('Login erfolgreich:', data);*/ }
                navigate('/user');
            } else {
                const error = await response.text();
                const errorlbl = document.getElementById('errorlbl');
                errorlbl.innerText = 'Registrierung fehlgeschlagen: ' + error;
            }
        } catch (error) {
            console.error('Netzwerkfehler:', error);
        }
    };

    return (
        <div className="user_register">
            <div className="backgroundImage"></div>

            <div className="registerFormContainer">

                <h1>Registrieren</h1>

                <form className="registerForm">
                    <div className="formGroup">

                        <label htmlFor="firstname">Vorname</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            placeholder="Vorname*"
                            autocomplete="given-name"
                            value={formData.firstname}
                            onChange={handleInputChange}
                        />

                    </div>
                    <div className="formGroup">

                        <label htmlFor="lastname">Nachname</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            placeholder="Nachname*"
                            autocomplete="family-name"
                            value={formData.lastname}
                            onChange={handleInputChange}
                        />

                    </div>
                    <div className="formGroup">

                        <label htmlFor="birthdate">Geburtstag</label>
                        <input
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            autocomplete="bday"
                            value={formData.birthdate}
                            onChange={handleInputChange}
                        />

                    </div>
                    <div className="formRow">
                        <div className="formGroup" style={{ width: "30%" }}>

                            <label htmlFor="zipcode" >PLZ</label>
                            <input
                                type="text"
                                id="zipcode"
                                name="zipcode"
                                placeholder="PLZ*"
                                autoComplete="postal-code"
                                value={formData.zipcode}
                                onChange={handleInputChange}
                            />

                        </div>
                        <div className="formGroup" style={{ width: "70%" }}>

                            <label htmlFor="city">Ort</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                placeholder="Ort*"
                                autoComplete="address-level2"
                                value={formData.city}
                                onChange={handleInputChange}
                            />

                        </div>
                    </div>
                    <div className="formRow">
                        <div className="formGroup" style={{ width: "60%" }}>

                            <label htmlFor="street">Stra&szlig;e</label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                placeholder="Stra&szlig;e*"
                                autoComplete="street-address"
                                value={formData.street}
                                onChange={handleInputChange}
                            />

                        </div>
                        <div className="formGroup" style={{ width: "20%" }}>

                            <label htmlFor="housenumber">HNr.</label>
                            <input
                                type="text"
                                id="housenumber"
                                name="housenumber"
                                placeholder="HNr.*"
                                autoComplete="address-line2"
                                value={formData.housenumber}
                                onChange={handleInputChange}
                            />

                        </div>
                        <div className="formGroup" style={{ width: "20%" }}>

                            <label htmlFor="co">c/o</label>
                            <input
                                type="text"
                                id="co"
                                name="co"
                                placeholder="c/o"
                                autoComplete="address-line3"
                                value={formData.co}
                                onChange={handleInputChange}
                            />

                        </div>
                    </div>
                    <div className="formGroup">

                        <label htmlFor="email">E-Mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="E-Mail*"
                            value={formData.email}
                            onChange={handleInputChange}
                        />

                    </div>
                    <div className="formRow">
                        <div className="formGroup" style={{ width: "70%" }}>

                            <label htmlFor="companyName">Firmenname</label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                placeholder="Firmenname"
                                value={formData.companyName}
                                onChange={handleInputChange}
                            />

                        </div>
                        <div className="formGroup" style={{ width: "30%" }}>

                            <label htmlFor="atuNumber">ATU-Nummer</label>
                            <input
                                type="text"
                                id="atuNumber"
                                name="atuNumber"
                                placeholder="ATU-Nummer"
                                value={formData.atuNumber}
                                onChange={handleInputChange}
                            />

                        </div>
                    </div>
                    <div className="formGroup">

                        <label htmlFor="password">Passwort</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Passwort*"
                            autocomplete="new-password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />

                    </div>
                    <div className="formGroup">

                        <label htmlFor="confirmPassword">Passwort best&auml;tigen</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Passwort best&auml;tigen*"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />

                    </div>
                    <div className="formOptions">
                        <div className="checkboxGroup">
                            <br />
                            <label id="errorlbl"></label>
                            <br />
                            <br />
                            <input type="checkbox" id="staySignedIn" />
                            <label htmlFor="staySignedIn">Angemeldet bleiben</label>

                        </div>
                    </div>

                    <button
                        type="submit"
                        className="registerButton"
                        onClick={handleRegister} 
                    >Registrieren</button>

                </form>
            </div>

            <div className="topRightImage">

                <img src={logo} alt="Lagerage-Logo" />

            </div>
        </div>
    );
}
export default User_Register;