import React, { useEffect, useState, useContext } from 'react';
import './Userlist.css';
import userIcon from '../../assets/userIconplaceholder.jpg';
import editIcon from '../../assets/editicon.png';
import deleteIcon from '../../assets/deleteicon.png';

function Userlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    async function fetchCustomers() {
        try {
            const response = await fetch('https://localhost:7186/User/customers', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Kunden-Liste:', error);
        }
    }

    async function deleteCustomer(id) {
        try {
            const response = await fetch(`https://localhost:7186/User/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            await fetchCustomers();
        } catch (error) {
            console.error('Fehler beim Löschen de Benutzers:', error);
        }
    }

    return (
      <div className="Userlist">
            <h2>Benutzer</h2>
            {customers.map((customer, index) => (
              <ul>
                    <li>
                        <div className="user-info">
                            <img src={userIcon} className="user-icon" alt="Benutzer-Icon"></img>
                            <p>{customer.email}</p>
                        </div>
                        <div className="user-action">
                            <img src={editIcon} className="edit-icon" alt="Edit-Icon"></img>
                            <img src={deleteIcon} className="delete-icon" alt="Delete-Icon" onClick={() => deleteCustomer(customer.id)}></img>
                        </div>
                    </li>
              </ul>
            ))}
      </div>
  );
}

export default Userlist;