import React, { useEffect, useState, useContext } from 'react';
import './Userlist.css';
import userIcon from '../../assets/userIconplaceholder.jpg';
import editIcon from '../../assets/editIcon.png';
import deleteIcon from '../../assets/deleteicon.png';

/* Userlist-Component*/
function Userlist({ customers, refreshCustomers, editCustomer, loadStorages }) {
    const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    //const url = "https://localhost:7186/";
    //Kunden löschen
    async function deleteCustomer(id) {
        try {
            const response = await fetch(url + `User/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            refreshCustomers();
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
                            <img src={editIcon} className="edit-icon" alt="Edit-Icon" onClick={() => { editCustomer(customer.id); loadStorages(customer.id);}}></img>
                            <img src={deleteIcon} className="delete-icon" alt="Delete-Icon" onClick={() => deleteCustomer(customer.id)}></img>
                        </div>
                    </li>
              </ul>
            ))}
      </div>
  );
}

export default Userlist;