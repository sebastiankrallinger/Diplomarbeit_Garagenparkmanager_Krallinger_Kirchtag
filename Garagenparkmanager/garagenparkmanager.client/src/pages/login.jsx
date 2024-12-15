import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './login.css';

function UserLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password,
        };

        try {
            const response = await fetch('https://localhost:7186/Account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();

                if (data) {
                    login(data.accesstoken, data.email);
                    console.log('Login erfolgreich');
                    navigate('/user');
                } else {
                    alert('Login fehlgeschlagen: Kein gültiges Token erhalten');
                }
            } else {
                const error = await response.text();
                alert('Login fehlgeschlagen: ' + error);
            }
        } catch (error) {
            console.error('Netzwerkfehler:', error);
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

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
                        onClick={handleLogin}
                    >
                        Anmelden
                    </button>
                </form>
                <div className="registerSection">
                    <p>Du hast noch kein Konto?</p>
                    <button
                        className="registerButton"
                        onClick={handleRegister}
                    >
                        Registrieren
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserLogin;
