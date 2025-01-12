import React, { useState, useEffect } from 'react';
import './UserObjects.css';
import deleteIcon from '../../assets/deleteicon.png';

/* UserObjects-Component*/
function UserObjects({ selectedUser, bookedStorages, loadStorages }) {
    //const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    const url = "https://localhost:7186/";
    const [freeStorages, setFreeStorages] = useState([]);
    const [selectedStorage, setSelectedStorage] = useState([]);

    useEffect(() => {
        fetchFreeStorages();
    }, []);

    async function fetchFreeStorages() {
        try {
            const response = await fetch(url + 'Storage/allobjects', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            const data = await response.json();
            setFreeStorages(data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Admin-Liste:', error);
        }
    }

    async function addStorage() {
        try {
            var id = selectedUser.id;
            const response = await fetch(`https://localhost:7186/User/addStorage/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: selectedStorage.id,
                    name: selectedStorage.name,
                    roomSize: selectedStorage.roomSize,
                    price: selectedStorage.price,
                    booked: true,
                    storagetype: selectedStorage.storagetype,
                    activeContract: {}
                }),
            });
            const data = await response.json();
            if (response.ok) {
                loadStorage();
                loadStorages(selectedUser.id);
                setFreeStorages(prevState => prevState.filter(storage => storage.id !== selectedStorage.id));
            }
        } catch (error) {
            console.error('Fehler beim Hinzufügen des Storages:', error);
        }
    }

    async function loadStorage() {
        try {
            const response = await fetch(`https://localhost:7186/Storage/storage/${selectedStorage.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                }
            });
            const data = await response.json();
            if (response.ok) {
                updateStorageStatus(data);
            }
        } catch (error) {
            console.error('Fehler beim Hinzufügen des Storages:', error);
        }
    }

    async function updateStorageStatus(data) {
        try {
            const response = await fetch(`https://localhost:7186/Storage/updateStatus`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: data.id,
                    name: data.name,
                    roomSize: data.roomSize,
                    price: data.price,
                    booked: true,
                    storagetype: data.storagetype,
                    activeContract: {}
                }),
            });
        } catch (error) {
            console.error('Fehler beim Hinzufügen des Storages:', error);
        }
    }

    return (
      <div className="UserObjects">
            <h2>Mietobjekte</h2>
            {bookedStorages.map((storage, index) => (
                <ul key={storage.id} >
                    <li key={storage.id} >
                        <p>{storage.name}</p>
                        <div className="object-action">
                            <img src={deleteIcon} className="delete-icon" alt="Delete-Icon"></img>
                        </div>
                    </li>
                </ul>
            ))}
            <h3>Mietobjekt hinzuf&uuml;gen</h3>
            <div className="dropdown">
                <select onChange={(e) => {
                    const selectedStorage = freeStorages.find(storage => storage.id === e.target.value);
                    setSelectedStorage(selectedStorage);
                }}>
                    <option>Objekt ausw&auml;hlen</option>
                    {freeStorages.map((storage) => {
                        if (storage.booked === false) {
                            return (
                                <option key={storage.id} value={storage.id}>{storage.name}</option>
                            );
                        }
                        return null;
                    })}
                </select>
                <button className="btn-add" onClick={() => addStorage()}>Hinzuf&uuml;gen</button>
            </div>
      </div>
  );
}

export default UserObjects;