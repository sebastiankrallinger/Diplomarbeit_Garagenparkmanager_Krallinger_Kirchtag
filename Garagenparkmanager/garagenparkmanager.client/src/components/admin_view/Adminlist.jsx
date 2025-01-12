import React, { useEffect, useState, useContext } from 'react';
import './Adminlist.css';
import userIcon from '../../assets/userIconplaceholder.jpg';
import editIcon from '../../assets/editIcon.png';
import deleteIcon from '../../assets/deleteicon.png';

/* Adminlist-Component */
function Adminlist({ admins, refreshAdmins, editAdmin }) {
    //const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    const url = "https://localhost:7186/";

    /* Admin löschen */
    async function deleteAdmin(id) {
        try {
            const response = await fetch(url + `User/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            refreshAdmins();
        } catch (error) {
            console.error('Fehler beim Löschen de Benutzers:', error);
        }
    }

    return (
        <div className="Adminlist">
            <h2>Admins</h2>
            {admins.map((admin, index) => (
                <ul key={admin.id}>
                    <li key={admin.id}>
                        <div className="admin-info">
                            <img src={userIcon} className="user-icon" alt="Benutzer-Icon" />
                            <p>{admin.email}</p>
                        </div>
                        <div className="admin-action">
                            <img src={editIcon} className="edit-icon" alt="Edit-Icon" onClick={() => editAdmin(admin.id)} />
                            <img src={deleteIcon} className="delete-icon" alt="Delete-Icon" onClick={() => deleteAdmin(admin.id)} />
                        </div>
                    </li>
                </ul>
            ))}      
        </div>
    );
}

export default Adminlist;