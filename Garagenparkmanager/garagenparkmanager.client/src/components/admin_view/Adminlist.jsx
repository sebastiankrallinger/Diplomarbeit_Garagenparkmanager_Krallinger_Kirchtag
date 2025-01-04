import React, { useEffect, useState, useContext } from 'react';
import './Adminlist.css';
import userIcon from '../../assets/userIconplaceholder.jpg';
import editIcon from '../../assets/editicon.png';
import deleteIcon from '../../assets/deleteicon.png';

function Adminlist() {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        fetchAdmins();
    }, []);

    async function fetchAdmins() {
        try {
            const response = await fetch('https://localhost:7186/User/admins', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            const data = await response.json();
            setAdmins(data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Admin-Liste:', error);
        }
    }

    async function deleteAdmin(id) {
        try {
            const response = await fetch(`https://localhost:7186/User/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            await fetchAdmins();
        } catch (error) {
            console.error('Fehler beim Löschen de Benutzers:', error);
        }
    }

    return (
        <div className="Adminlist">
            <h2>Admins</h2>
            {admins.map((admin, index) => (
                <ul>
                    <li key={index}>
                        <div className="admin-info">
                            <img src={userIcon} className="user-icon" alt="Benutzer-Icon" />
                            <p>{admin.email}</p>
                        </div>
                        <div className="admin-action">
                            <img src={editIcon} className="edit-icon" alt="Edit-Icon" />
                            <img src={deleteIcon} className="delete-icon" alt="Delete-Icon" onClick={() => deleteAdmin(admin.id)} />
                        </div>
                    </li>
                </ul>
            ))}
        </div>
    );
}

export default Adminlist;