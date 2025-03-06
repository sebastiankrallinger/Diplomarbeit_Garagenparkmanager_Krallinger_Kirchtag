import React, { useEffect, useState, useContext } from 'react';
import './Adminlist.css';
import editIcon from '../../assets/editIcon.png';
import deleteIcon from '../../assets/deleteicon.png';

/* Adminlist-Component */
function Adminlist({ admins, refreshAdmins, editAdmin }) {
    //const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    const url = "https://localhost:7186/";
    const [showPopup, setShowPopup] = useState(false);
    const [oneAdmin, setOneAdmin] = useState(null);

    const openPopup = (admin) => {
        setOneAdmin(admin);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setOneNews(null);
    };

    /* Admin löschen */
    async function deleteAdmin(id) {
        try {
            const response = await fetch(url + `User/deleteUser/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            refreshAdmins();
            closePopup();
        } catch (error) {
            console.error('Fehler beim Löschen de Benutzers:', error);
        }
    }

    return (
        <><h2>Admins</h2>
        <div className="Adminlist">
            {admins.map((admin, index) => (
                <ul key={admin.id}>
                    <li key={admin.id}>
                        <div className="admin-info">
                            <p>{admin.email}</p>
                        </div>
                        <div className="admin-action">
                            <img src={editIcon} className="edit-icon" alt="Edit-Icon" onClick={() => editAdmin(admin.id)} />
                            <img src={deleteIcon} className="delete-icon" alt="Delete-Icon" onClick={() => openPopup(admin)} />
                        </div>
                    </li>
                </ul>
            ))}
            </div>
            {
                showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <p>Wollen sie {oneAdmin.email} wirklich l&ouml;schen?</p>
                            <button onClick={() => deleteAdmin(oneAdmin.id)}>Best&auml;tigen</button>
                            <button onClick={closePopup}>Abbrechen</button>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default Adminlist;