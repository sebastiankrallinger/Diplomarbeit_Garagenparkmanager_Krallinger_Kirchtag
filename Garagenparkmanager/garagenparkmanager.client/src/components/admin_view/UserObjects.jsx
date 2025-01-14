import React, { useState, useEffect } from 'react';
import './UserObjects.css';
import deleteIcon from '../../assets/deleteicon.png';

/* UserObjects-Component*/
function UserObjects({ selectedUser, bookedStorages, loadStorages, contract }) {
    //const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    const url = "https://localhost:7186/";
    const [freeStorages, setFreeStorages] = useState([]);
    const [selectedStorage, setSelectedStorage] = useState([]);
    const [vpi, setVpi] = useState();

    useEffect(() => {
        fetchFreeStorages();
        loadVPI();
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
            const updateContract = {
                extraCosts: 0,
                VPIold: vpi,
                status: true,
                startDate: new Date().toISOString(),
                duration: 3,
                endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 3)).toISOString(),
            };
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
                    activeContract: updateContract,
                    imageUrl: "",
                }),
            });
            const data = await response.json();
            if (response.ok) {
                contract(updateContract);
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
                    booked: false,
                    storagetype: data.storagetype,
                    activeContract: data.activeContract,
                    imageUrl: data.imageUrl,
                }),
            });
        } catch (error) {
            console.error('Fehler beim Hinzufügen des Storages:', error);
        }
    }

    /*async function deleteStorage(id, storage) {
        try {
            const response = await fetch(url + `User/deleteStorage/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(storage),
            });
        } catch (error) {
            console.error('Fehler beim Löschen des Storages:', error);
        }
    }*/

    async function loadVPI() {
        try {
            const response = await fetch(url + 'Storage/vpi', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            });
            if (!response.ok) {
                throw new Error('Fehler beim Abrufen des VPI');
            }
            const data = await response.text();
            const rows = data.trim().split("\n");
            const lastVPI = rows[rows.length - 13];
            const splitRow = lastVPI.split(";");
            const vpiValue = parseFloat(splitRow[2].replace(",", ".")).toFixed(2);
            setVpi(vpiValue);
        } catch (error) {
            console.error('Fehler beim Abrufen des VPI:', error);
        }
    }

    return (
      <div className="UserObjects">
            <h2>Mietobjekte</h2>
            {bookedStorages && bookedStorages.length > 0 && bookedStorages.map((storage, index) => (
                <ul key={storage.id} >
                    <li key={storage.id} >
                        <p>{storage.name}</p>
                        <div className="object-action">
                            <img src={deleteIcon} className="delete-icon" alt="Delete-Icon" /*onClick={() => deleteStorage(selectedUser.id, storage)}*/ ></img>
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