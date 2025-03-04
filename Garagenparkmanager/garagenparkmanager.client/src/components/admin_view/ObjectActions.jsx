import React, { useState, useEffect } from 'react';
import './ObjectActions.css'
import objectImg from '../../assets/newsPlaceholder.jpg';
import deleteIcon from '../../assets/deleteicon.png';
import { v4 as uuidv4 } from 'uuid';
import imageCompression from 'browser-image-compression';


/* ObjectActions-Component*/
function ObjectActions() {
    //const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    const url = "https://localhost:7186/";
    const [showPopupDetails, setShowPopupDetails] = useState(false);
    const [showPopupAdd, setShowPopupAdd] = useState(false);
    const [vpi, setVpi] = useState(null);
    const [customerFirstname, setcustomerFirstname] = useState();
    const [customerLastname, setcustomerLastname] = useState();
    const [customerEmail, setcustomerEmail] = useState();
    const [customerCompany, setcustomerCompany] = useState();
    const [storages, setStorages] = useState([]);
    const [storageTypes, setStorageTypes] = useState([]);
    const [selectedStorage, setSelectedStorage] = useState([]);
    const [type, setType] = useState('');
    const [oldvpi, setOldVpi] = useState(null);
    const [image, setImage] = useState(null);
    const [contract, setContract] = useState(null);
    const [duration, setDuration] = useState(null);
    const [startdate, setStartDate] = useState(null);

    const [storageData, setStorageData] = useState({
        roomSize: '',
        price: '',
        storagetype: '',
        name: '',
        imageUrl: ''
    });

    const handleButtonDetailsClick = (storage) => {
        setShowPopupDetails(true);
        getCustomerDetails(storage);
        setSelectedStorage(storage);
        loadVPI();
    };

    const handleButtonAddClick = () => {
        getTypes();
        setShowPopupAdd(true);
    };

    const closePopupDetails = () => {
        setShowPopupDetails(false);
        setcustomerFirstname();
        setcustomerLastname();
        setcustomerEmail();
        setcustomerCompany();
    };

    const closePopupAdd = () => {
        setShowPopupAdd(false);
        setStorageTypes([]);
    };

    const handleInputChangeStorage = async (e) => {
        const { name, value, files } = e.target;

        if (name === "image" && files.length > 0) {
            const file = files[0];

            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
                fileType: 'image/webp',
            };

            try {
                const compressedFile = await imageCompression(file, options);
                const reader = new FileReader();

                reader.onloadend = () => {
                    setStorageData(prevData => ({
                        ...prevData,
                        imageUrl: reader.result
                    }));
                };

                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.error('Fehler bei der Bildkomprimierung:', error);
            }
        } else {
            const updatedData = {
                ...storageData,
                [name]: value !== undefined && value !== null ? value : ''
            };
            setStorageData(updatedData);
        }
    };


    async function addobject() {
        const data = {
            name: storageData.name,
            roomSize: parseFloat(storageData.roomSize),
            price: parseFloat(storageData.price),
            storagetype: storageData.storagetype,
            imageUrl: storageData.imageUrl,
        };

        try {
            const response = await fetch(url + 'Storage/addobject', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log("Erfolgreich hinzugefügt!");
                setStorageData({
                    roomSize: '',
                    price: '',
                    storagetype: '',
                    imageUrl: ''
                });
                fetchStorages();
                closePopupAdd();
            } else {
                console.error("Fehler beim Hinzufügen des Objekts.");
            }
        } catch (error) {
            console.error('Netzwerkfehler:', error);
        }
    }


    useEffect(() => {
        fetchStorages();
    }, []);

    async function fetchStorages() {
        try {
            const response = await fetch(url + 'Storage/allobjects', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            const data = await response.json();
            setStorages(data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Admin-Liste:', error);
        }
    }

    //aktuellen VPI laden
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
            setOldVpi(vpiValue);
        } catch (error) {
            console.error('Fehler beim Abrufen des VPI:', error);
        }
    }

    //Kundendetails laden
    async function getCustomerDetails(storage) {
        try {
            const response = await fetch(url + 'User/customers', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            });

            if (!response.ok) {
                throw new Error('Fehler beim Abrufen des VPI');
            }

            const data = await response.json();

            const customer = data.find(customer =>
                customer.storages.some(storageObj => storageObj.id === storage.id)
            );

            if (customer) {
                setcustomerFirstname(customer.firstname);
                setcustomerLastname(customer.lastname);
                setcustomerEmail(customer.email);
                setcustomerCompany(customer.companyName)
            } else {
                //console.log('Kein Kunde gefunden, der diese Storage-ID hat.');
            }
        } catch (error) {
            console.error('Fehler beim Abrufen der Kunden:', error);
        }
    }

    async function getTypes() {
        try {
            const response = await fetch(url + 'Storage/alltypes', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            });

            if (!response.ok) {
                throw new Error('Fehler beim Abrufen des VPI');
            }

            const data = await response.json();
            setStorageTypes(data);

        } catch (error) {
            console.error('Fehler beim Abrufen der Typen:', error);
        }
    }

    async function addType(type) {
        try {
            const response = await fetch(url + 'Storage/addType', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(type)
            });

            setType();
            getTypes();

        } catch (error) {
            console.error('Fehler beim Erstellen des Typs:', error);
        }
    }

    async function deleteType(type) {
        try {
            const response = await fetch(url + `Storage/deleteStorageType/${type}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });

            getTypes();
        } catch (error) {
            console.error('Fehler beim Löschen des Typs:', error);
        }
    }

    async function uploadContract() {
        if (!contract) {
            console.error("Keine Datei ausgewählt!");
            return;
        }

        const selectedFile = contract;
        setContract(null);
        document.getElementById("fileInput").value = "";
        document.getElementById("duration").value = "";
        document.getElementById("date").value = "";

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
                await updateActiveContract(selectedStorage.id, selectedFile.name, responseData.fileUrl);

                fetchStorages();
            } catch (error) {
                console.error("Fehler beim Hochladen:", error);
            }
        };

        reader.readAsDataURL(selectedFile);
    }

    async function updateActiveContract(id, filename, fileurl) {
        try {
            const updateContract = {
                id: uuidv4(),
                extraCosts: 0,
                VPIold: vpi,
                status: true,
                startDate: startdate,
                duration: duration,
                endDate: new Date(new Date(startdate).setFullYear(new Date(startdate).getFullYear() + parseInt(duration))),
                filename: filename,
                fileurl: fileurl,
            };
            const response = await fetch(url + `Storage/addActiveContract/${id}`, {
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
        } catch (error) {
            console.error("Fehler beim Hochladen:", error);
        }
    }

    return (
        <div className="ObjectActions">
            <h2>Alle Lager/Immobilien</h2>
            <button onClick={handleButtonAddClick}>Objekt hinzuf&uuml;gen</button>
            <div className="rentedObjects">
                {storages.map((storage, index) => (
                    <ul className={`${storage.booked === true ? 'gray-background' : ''}`} key={storage.id}>
                        <li key={storage.id}>
                            <div className="objects">
                                <img
                                    src={storage.imageUrl ? storage.imageUrl : objectImg }
                                    className="objectImage"
                                    alt="Object-Image"
                                />
                                <div className="objects-content">
                                    <h2>{storage.name}</h2>
                                    <p>{storage.roomSize} m&sup2; {storage.price} &euro; {storage.storagetype} </p>
                                    {storage.activeContract !== null ? (
                                        <p>Gemietet bis: {new Date(storage.activeContract.endDate).toLocaleDateString('de-DE')}</p>
                                    ) : null}
                                    <button className="btn-details" onClick={() => handleButtonDetailsClick(storage)}>N&auml;here Infos</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                ))}
            </div>
            {showPopupDetails && (
                <div className="popup-details">
                    <div className="popup-details-content">
                        <img src={deleteIcon} className="delete-icon" alt="Delete-Icon" onClick={closePopupDetails}></img>
                        <img
                            src={selectedStorage.imageUrl ? selectedStorage.imageUrl : objectImg}
                            className="objectImage"
                            alt="Object-Image"
                        />
                        <div className="popup-details-textcontent">
                            <h2>{selectedStorage.name}</h2>
                            {selectedStorage.booked === false ? (
                                <div className="actualContract">
                                    <div className="actualContract-content">
                                        <h3>kein Vertrag vorhanden</h3>
                                    </div>
                                </div>
                            ) : (
                                    <>
                                        <p>{selectedStorage.price} / {`${selectedStorage.activeContract.vpIold.toFixed(2)}`} * {`${vpi}`} = {(selectedStorage.price / parseFloat(selectedStorage.activeContract.vpIold) * parseFloat(vpi)).toFixed(2)} &euro;</p>
                                        <div className="actualContract">
                                            <div className="actualContract-content">
                                                <h3>Aktueller Vertrag bis XX.XX.XXXX</h3>
                                                <button className="btn-download">Abrufen</button>
                                                <input id="date" className="date" type="date" onChange={(e) => setStartDate(e.target.value)} />
                                                <input id="duration" className="duration" type="number" onChange={(e) => setDuration(e.target.value)} />
                                                <input
                                                    id="fileInput"
                                                    type="file"
                                                    accept="application/pdf"
                                                    onChange={(e) => setContract(e.target.files[0])}
                                                    className="document"
                                                    placeholder="Dokument"
                                                />
                                                <button className="btn-upload" onClick={uploadContract}>neuen Vertag hochladen</button>
                                            </div>
                                        </div>
                                    </>
                            )}
                            {selectedStorage.booked === false ? (
                                <div className="renter">
                                    <div className="renter-content">
                                        <h3>kein Mieter vorhanden</h3>
                                    </div>
                                </div>
                            ) : (
                                    <div className="renter">
                                        <div className="renter-content">
                                            <h3>Mieter</h3>
                                            <p>{customerFirstname} {customerLastname}</p>
                                            <p>{customerEmail}</p>
                                            <p>{customerCompany}</p>
                                        </div>
                                    </div>
                            )}   
                        </div>
                    </div>
                </div>
            )}
            {showPopupAdd &&(
                <div className="popup-add">
                    <div className="popup-add-content">
                        <img src={deleteIcon} className="delete-icon" alt="Delete-Icon" onClick={closePopupAdd}></img>
                        <div className="left-content">
                            <h2>Objekttypen</h2>
                            {storageTypes.map((storageType, index) => (
                                <ul key={index}>
                                    <li key={index}> 
                                        <p>{storageType}</p>
                                        <img src={deleteIcon} onClick={() => deleteType(storageType)} className="delete-icon-object" alt="Delete-Icon"></img>
                                    </li>
                                </ul>
                            ))}
                            <h2 className="newTyp">Neuen Objekttypen definieren</h2>
                            <div className="new-object-type">
                                <input
                                    className="type"
                                    placeholder="Objekttyp"
                                    value={type || ''} 
                                    onChange={(e) => setType(e.target.value)}
                                />
                                <button className="btn-addTyp" onClick={() => addType(type)}>Erstellen</button>
                            </div>
                        </div>
                        <div className="seperator"></div>
                        <div className="popup-add-textcontent">
                            <h2>Neues Objekt erstellen</h2>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={storageData.name}
                                onChange={handleInputChangeStorage}
                            />
                            <input 
                                type="number"
                                id="roomSize"
                                name="roomSize"
                                placeholder="Gr&ouml;&szlig;e in m&sup2;"
                                value={storageData.roomSize}
                                onChange={handleInputChangeStorage}
                            />
                            <input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="Mietpreis"
                                value={storageData.price}
                                onChange={handleInputChangeStorage}
                            />
                            <div className="dropdown">
                                <select value={storageData.storagetype || ''} onChange={handleInputChangeStorage} name="storagetype">
                                    <option value="">Objekttyp auswählen</option>
                                    {storageTypes.map((storageType) => (
                                        <option key={storageType} value={storageType}>{storageType}</option>
                                    ))}
                                </select>
                            </div>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleInputChangeStorage}
                            />
                            <button className="btn-addObject" onClick={addobject}>Objekt hinzuf&uuml;gen</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
  );
}

export default ObjectActions;