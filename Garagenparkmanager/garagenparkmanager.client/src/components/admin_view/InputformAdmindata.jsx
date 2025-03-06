import { useEffect, useState, useContext } from 'react';
import './InputformAdmindata.css';

/* InputformAdmindata-Component*/
function InputformAdmindata({ refreshAdmins, admin, handleFormChange }) {
    //const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    const url = "https://localhost:7186/";
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);

    //Input erfassen
    useEffect(() => {
        if (admin) {
            setFormData({
                firstname: admin.firstname,
                lastname: admin.lastname,
                email: admin.email,
                password: admin.password,
            });
        } else if (!admin) {
            setFormData({
                firstname: '',
                lastname: '',
                email: '',
                password: '',
            });
        }
    }, [admin]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedData = {
            ...formData,
            [name]: value,
        };
        setFormData(updatedData);

        handleFormChange(updatedData);
    };

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    //Admin erstellen
    const handleRegister = async (e) => {
        e.preventDefault();

        const data = {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            password: formData.password
        };

        try {
            const response = await fetch(url + 'Account/registerAdmin', {
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
                });
                const errorlbl = document.getElementById('errorlbl');
                errorlbl.innerText = '';
                refreshAdmins();
                openPopup();
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
            </div>
            <br />
            <label id="errorlbl"></label>
            <br />
            <button id="createBtn" className="btn-addnew" onClick={handleRegister} >Erstellen</button>
            {
                showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <p>Admin erfolgreich hinzugef&uuml;gt!</p>
                            <button onClick={closePopup}>OK</button>
                        </div>
                    </div>
                )
            }
        </div>
  );
}

export default InputformAdmindata;