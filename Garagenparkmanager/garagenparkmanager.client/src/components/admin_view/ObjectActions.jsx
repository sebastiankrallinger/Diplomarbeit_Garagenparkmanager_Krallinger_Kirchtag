import React, { useState, useEffect } from 'react';
import './ObjectActions.css'
import objectImg from '../../assets/newsPlaceholder.jpg';
import deleteIcon from '../../assets/deleteicon.png';

/* ObjectActions-Component*/
function ObjectActions() {
    const [showPopupDetails, setShowPopupDetails] = useState(false);
    const [showPopupAdd, setShowPopupAdd] = useState(false);
    const [vpi, setVpi] = useState(null);


    const [storageData, setStorageData] = useState({
        roomSize: '',
        price: '',
        storagetype: '',
        name: ''
    });

    //Pop-Ups �ffnen/schliessen
    const handleButtonDetailsClick = () => {
        setShowPopupDetails(true);
        loadVPI();
    };

    const handleButtonAddClick = () => {
        setShowPopupAdd(true);
    };

    const closePopupDetails = () => {
        setShowPopupDetails(false);
    };

    const closePopupAdd = () => {
        setShowPopupAdd(false);
    };

    const handleInputChangeStorage = (e) => {
        const { name, value } = e.target;
        const updatedData = {
            ...storageData,
            [name]: value,
        };
        setStorageData(updatedData);
    };

    async function addobject() {
        const data = {
            name: storageData.name,
            roomSize: parseFloat(storageData.roomSize),
            price: parseFloat(storageData.price),
            booked: false,
            storagetype: storageData.storagetype,
        };
        try {
            const response = await fetch('https://localhost:7186/Storage/addobject', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${ localStorage.getItem('accesstoken') }`,
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
                });
            }
        } catch (error) {
            console.error('Netzwerkfehler:', error);
        }
    }

    //aktuellen VPI laden
    async function loadVPI() {
        try {
            const response = await fetch('/data/data/OGD_vpi10_VPI_2010_1.csv');
            const data = await response.text();
            const rows = data.trim().split("\n");
            const lastVPI = rows[rows.length - 1];
            const splitRow = lastVPI.split(";");
            const vpiValue = parseFloat(splitRow[2].replace(",", ".")).toFixed(2);
            setVpi(vpiValue);
        } catch (error) {
            console.error('Fehler beim Abrufen des VPI:', error);
        }
    }

    return (
        <div className="ObjectActions">
            <div className="rentedObjects">
                <button onClick={handleButtonAddClick}>Objekt hinzuf&uuml;gen</button>
                <h2>Vermietete Objekte</h2>
                <ul>
                    <li>
                        <div className="objects">
                            <img src={objectImg} className="objectImage" alt="Object-Image"></img>
                            <div className="objects-content">
                                <h2>Garage Z4</h2>
                                <p>Gr&ouml;&szlig;e Preis Mieter</p>
                                <button className="btn-details" onClick={handleButtonDetailsClick}>N&auml;here Infos</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            {showPopupDetails && (
                <div className="popup-details">
                    <div className="popup-details-content">
                        <img src={deleteIcon} className="delete-icon" alt="Delete-Icon" onClick={closePopupDetails}></img>
                        <img src={objectImg} className="objectImage" alt="Object-Image"></img>
                        <div className="popup-details-textcontent">
                            <h2>Garage Z4 - Details</h2>
                            <p>Mietzins alt / Index alt * {`${vpi}`} = Mietzins neu</p>
                            <div className="actualContract">
                                <div className="actualContract-content">
                                    <h3>Aktueller Vertrag bis XX.XX.XXXX</h3>
                                    <button className="btn-download">Abrufen</button>
                                    <button className="btn-upload">neuen Vertag hochladen</button>
                                </div>
                            </div>
                            <div className="renter">
                                <div className="renter-content">
                                    <h3>Mieter</h3>
                                    <p>Mieter Infos</p>
                                    <button className="btn-download">Daten Abrufen</button>
                                </div>
                            </div>
                            <button className="btn-saveChanges" onClick={closePopupDetails}>&Auml;nderungen Speichern</button>
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
                            <ul>
                                <li>
                                    <p>B&uuml;ro</p>
                                    <img src={deleteIcon} className="delete-icon-object" alt="Delete-Icon"></img>
                                </li>
                                <li>
                                    <p>Garage</p>
                                    <img src={deleteIcon} className="delete-icon-object" alt="Delete-Icon"></img>
                                </li>
                                <li>
                                    <p>SampleItem</p>
                                    <img src={deleteIcon} className="delete-icon-object" alt="Delete-Icon"></img>
                                </li>
                            </ul>
                            <h2 className="newTyp">Neuen Objekttypen definieren</h2>
                            <div className="new-object-type">
                                <input placeholder="Objekttyp"></input>
                                <button className="btn-addTyp">Erstellen</button>
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
                                <select value={storageData.storagetype} onChange={handleInputChangeStorage} name="storagetype">
                                    <option value="">Objekttyp ausw&auml;hlen</option>
                                    <option value="buero">Büro</option>
                                    <option value="garage">Garage</option>
                                    <option value="kleinlager">Kleinlager</option>
                                </select>
                            </div>
                            <button className="btn-addObject" onClick={addobject}>Objekt hinzuf&uuml;gen</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
  );
}

export default ObjectActions;