import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import './login.css';

function UserLogin() {
    const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    //const url = "https://localhost:7186/";
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    //Token beim Laden prüfen
    useEffect(() => {
        const token = Cookies.get('auth_token');
        if (token) {
            const decodedToken = jwtDecode(token);
            login(token, decodedToken.name);
            navigate('/user');
        }
    }, [navigate]);

    //Login-Verfahren
    const handleLogin = async (e) => {
        e.preventDefault();

        const staySignedIn = document.getElementById('staySignedIn').checked;
        const loginData = {
            email,
            password,
        };

        try {
            const response = await fetch(url + 'Account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);

                if (data) {
                    if (data.role == 1 || data.role == 0) {
                        login(data.accesstoken, data.email, data.role);
                        {/*console.log('Login erfolgreich');*/ }
                        navigate('/admin');
                    } else {
                        if (staySignedIn) {
                            Cookies.set('auth_token', data.accesstoken, { expires: 4, secure: true, sameSite: 'Strict' });
                        }
                        login(data.accesstoken, data.email, data.role);
                        {/*console.log('Login erfolgreich');*/ }
                        navigate('/user');
                    }
                } else {
                    alert('Login fehlgeschlagen: Kein gültiges Token erhalten');
                }
            } else {
                const error = await response.text();
                const errorlbl = document.getElementById('errorlbl');
                errorlbl.innerText = 'Login fehlgeschlagen: ' + error;
            }
        } catch (error) {
            console.error('Netzwerkfehler:', error);
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    //Frontend
    return (
        <div className="loginPage">

            <div className="backgroundImage"></div>

            <div className="loginFormContainer">

                <h1>Bei Ihrem Konto anmelden</h1>

                <form className="loginForm">
                    <div className="formGroup">

                        <label htmlFor="email">E-Mail</label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="E-Mail eingeben"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>
                    <div className="formGroup">

                        <label htmlFor="password">Passwort</label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Passwort eingeben"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <label id="errorlbl"></label>

                    </div>
                    <div className="formOptions">

                        <div className="checkboxGroup">

                            <input type="checkbox" id="staySignedIn"/>
                            <label htmlFor="staySignedIn">Angemeldet bleiben</label>

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="loginButton"
                        onClick={handleLogin}
                    >Anmelden</button>

                </form>
                <div className="registerSection">

                    <p>Du hast noch kein Konto?</p>
                    <button
                        className="registerButton"
                        onClick={handleRegister}
                    >Registrieren</button>

                </div>
            </div>

            <div className="topRightImage">
                <img src="../../src/assets/logo_Lagerage.png" alt="Lagerage-Logo" />
            </div>

        </div>
    );
}
export default UserLogin;