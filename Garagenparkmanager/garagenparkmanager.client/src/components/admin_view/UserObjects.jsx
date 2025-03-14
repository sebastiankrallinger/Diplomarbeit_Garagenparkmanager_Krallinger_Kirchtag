import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './UserObjects.css';
import downloadIcon from '../../assets/downloadicon.png';
import deleteIcon from '../../assets/deleteicon.png';

/* UserObjects-Component*/
function UserObjects({ selectedUser, setSelectedUser, bookedStorages, loadStorages, contract }) {
    const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    //const url = "https://localhost:7186/";
    const [freeStorages, setFreeStorages] = useState([]);
    const [selectedStorage, setSelectedStorage] = useState([]);
    const [vpi, setVpi] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [object, setObject] = useState(null);
    const [user, setUser] = useState(null);
    const [uploadContract, setUploadContract] = useState(null);
    const [duration, setDuration] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [extraCosts, setExtraCosts] = useState(null);

    useEffect(() => {
        fetchFreeStorages();
        loadVPI();
    }, []);

    const openPopup = (object, user) => {
        setUser(user);
        setObject(object);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setObject(null);
        setUser(null);
    };

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

    async function addStorage(filename, fileurl) {
        try {
            const updateContract = {
                id: uuidv4(),
                extraCosts: extraCosts,
                VPIold: vpi,
                status: true,
                startDate: startDate,
                duration: duration,
                endDate: new Date(new Date().setFullYear(new Date().getFullYear() + Number(duration))).toISOString(),
                filename: filename,
                fileurl: fileurl,
            };
            var id = selectedUser.id;
            const response = await fetch(url + `User/addStorage/${id}`, {
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
                    imageUrl: selectedStorage.imageUrl,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                addToHistory(id, updateContract);
                contract(updateContract);
                loadStorage();
                loadStorages(selectedUser.id);
                setFreeStorages(prevState => prevState.filter(storage => storage.id !== selectedStorage.id));
            }
        } catch (error) {
            console.error('Fehler beim Hinzufügen des Storages:', error);
        }
    }

    async function addToHistory(id, updateContract) {
        try {
            const response = await fetch(url + `User/updateContractHistory/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateContract),
            });

            if (!response.ok) {
                throw new Error("Fehler beim Hochladen");
            }
            const data = await response.json();
            setSelectedUser(data);

        } catch (error) {
            console.error("Fehler beim Hochladen:", error);
        }
    }

    async function uploadNewContract() {
        if (!uploadContract) {
            console.error("Keine Datei ausgewählt!");
            return;
        }

        const selectedFile = uploadContract;
        setUploadContract(null);
        document.getElementById("fileInput").value = "";
        document.getElementById("duration").value = "";
        document.getElementById("date").value = "";
        document.getElementById("extraCosts").value = "";
        setSelectedStorage(null);
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64File = reader.result.split(',')[1];
            try {
                const response = await fetch(url + "Document/uploadContract", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("accesstoken")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ file: base64File, fileName: selectedFile.name }),
                });

                if (!response.ok) {
                    throw new Error("Fehler beim Hochladen");
                }

                const responseData = await response.json();
                await addStorage(selectedFile.name, responseData.fileUrl);
            } catch (error) {
                console.error("Fehler beim Hochladen:", error);
            }
        };

        reader.readAsDataURL(selectedFile);
    }

    async function loadStorage() {
        try {
            const response = await fetch(url + `Storage/storage/${selectedStorage.id}`, {
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
            const response = await fetch(url + `Storage/updateStatus`, {
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

    async function deleteStorage(id, storage) {
        try {
            const c = storage.activeContract;
            c.status = false;
            const response = await fetch(url + `User/deleteStorage/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(storage),
            });
            if (response.ok) {
                contract(c);
                loadStorages(selectedUser.id);
                fetchFreeStorages();
                closePopup();
            }
        } catch (error) {
            console.error('Fehler beim Löschen des Storages:', error);
        }
    }

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
                            <img src={deleteIcon} className="delete-icon" alt="Delete-Icon" onClick={() => openPopup(storage, selectedUser)} ></img>
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
                <br />
                <input id="date" className="date" type="date" onChange={(e) => setStartDate(e.target.value)} />
                <label>Vertragsdauer</label>
                <input id="duration" className="duration" type="number" onChange={(e) => setDuration(e.target.value)} />
                <label>Extrakosten</label>
                <input id="extraCosts" className="extraCosts" type="number" onChange={(e) => setExtraCosts(e.target.value)} />
                <input
                    id="fileInput"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setUploadContract(e.target.files[0])}
                    className="contract"
                />
                <br/>
                <button className="btn-add" onClick={() => uploadNewContract()}>Hinzuf&uuml;gen</button>
                <br />
                <br />
                <h3>Vertragshistorie</h3>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <select onChange={(e) => {
                        const selectedContract = selectedUser?.contracts?.find(contract => contract.id === e.target.value);
                        setSelectedStorage(selectedContract);
                    }}>
                        <option>Vertrag ausw&auml;hlen</option>
                        {selectedUser?.contracts && selectedUser.contracts.map((contract) => (
                            <option key={contract.id} value={contract.id}>
                                {contract.fileName}
                            </option>
                        ))}
                    </select>
                    {selectedStorage && (
                        <a href={selectedStorage.fileUrl} target="_blank" className="btn-add">
                            Vertrag &ouml;ffnen
                        </a>
                    )}
                </div>
            </div>
            {
                showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <p>Wollen sie {object.name} wirklich entfernen?</p>
                            <button onClick={() => deleteStorage(user.id, object)}>Best&auml;tigen</button>
                            <button onClick={closePopup}>Abbrechen</button>
                        </div>
                    </div>
                )
            }
      </div>
  );
}

export default UserObjects;