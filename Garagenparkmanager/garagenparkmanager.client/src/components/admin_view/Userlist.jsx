import React, { useEffect, useState, useContext } from 'react';
import './Userlist.css';
import userIcon from '../../assets/userIconplaceholder.jpg';
import editIcon from '../../assets/editIcon.png';
import deleteIcon from '../../assets/deleteicon.png';

/* Userlist-Component*/
function Userlist({ customers, refreshCustomers, refreshStorages, editCustomer, loadStorages }) {
    //const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    const url = "https://localhost:7186/";
    const [showPopup, setShowPopup] = useState(false);
    const [oneUser, setOneUser] = useState(null);

    const openPopup = (user) => {
        setOneUser(user);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setOneUser(null);
    };

    //Kunden löschen
    async function deleteCustomer(id) {
        try {
            const response = await fetch(url + `User/deleteUser/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            refreshCustomers();
            refreshStorages();
            closePopup();
        } catch (error) {
            console.error('Fehler beim Löschen de Benutzers:', error);
        }
    }

    return (
      <div className="Userlist">
            <h2>Benutzer</h2>
            {customers.map((customer, index) => (
              <ul key={customer.id}>
                    <li key={customer.id}>
                        <div className="user-info">
                            <img src={userIcon} className="user-icon" alt="Benutzer-Icon"></img>
                            <p>{customer.email}</p>
                        </div>
                        <div className="user-action">
                            <img src={editIcon} className="edit-icon" alt="Edit-Icon" onClick={() => { editCustomer(customer.id); loadStorages(customer.id); }}></img>
                            <img src={deleteIcon} className="delete-icon" alt="Delete-Icon" onClick={() => openPopup(customer)}></img>
                        </div>
                    </li>
              </ul>
            ))}
            {
                showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <p>Wollen sie {oneUser.email} wirklich l&ouml;schen?</p>
                            <button onClick={() => deleteCustomer(oneUser.id)}>Best&auml;tigen</button>
                            <button onClick={closePopup}>Abbrechen</button>
                        </div>
                    </div>
                )
            }
      </div>
  );
}

export default Userlist;