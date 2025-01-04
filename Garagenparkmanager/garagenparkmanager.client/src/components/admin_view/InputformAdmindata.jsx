import { useEffect, useState, useContext } from 'react';
import './InputformAdmindata.css';

function InputformAdmindata({ refreshAdmins }) {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //Admin erstellen
    const handleRegister = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwörter stimmen nicht überein!');
            return;
        }

        const data = {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            password: formData.password
        };

        try {
            const response = await fetch('https://localhost:7186/Account/registerAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setFormData({
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
                const errorlbl = document.getElementById('errorlbl');
                errorlbl.innerText = '';
                refreshAdmins();
            } 
            else 
            {
                const error = await response.text();
                const errorlbl = document.getElementById('errorlbl');
                errorlbl.innerText = 'Registrierung fehlgeschlagen: ' + error;
            }
        } catch (error) {
            console.error('Netzwerkfehler:', error);
        }
    };

    return (
        <div className="InputformAdmindata">
            <h2>Admindaten</h2>
            <div className="inputForm">
                <input type="text" name="firstname" placeholder="Vorname" value={formData.firstname} onChange={handleInputChange}></input>
                <input type="text" name="lastname" placeholder="Nachname" value={formData.lastname} onChange={handleInputChange}></input>
                <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange}></input>
                <input type="password" name="password" placeholder="Passwort" value={formData.password} onChange={handleInputChange}></input>
                <input type="password" name="confirmPassword" placeholder="Passwort Best&auml;tigen" value={formData.confirmPassword} onChange={handleInputChange}></input>
            </div>
            <br />
            <label id="errorlbl"></label>
            <br />
            <button className="btn-addnew" onClick={handleRegister} >Erstellen</button>
        </div>
  );
}

export default InputformAdmindata;