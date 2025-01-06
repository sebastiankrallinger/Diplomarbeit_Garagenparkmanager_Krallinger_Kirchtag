import React, { useState, useEffect } from 'react';
import './ObjectActions.css'
import objectImg from '../../assets/newsPlaceholder.jpg';
import deleteIcon from '../../assets/deleteicon.png';


function ObjectActions() {
    const [showPopupDetails, setShowPopupDetails] = useState(false);
    const [showPopupAdd, setShowPopupAdd] = useState(false);
    const [groesse, setGroesse] = useState('');
    const [mietpreis, setMietpreis] = useState('');
    const [extrakosten, setExtrakosten] = useState('');
    const [vpi, setVpi] = useState(null);

    const handleButtonDetailsClick = () => {
        setShowPopupDetails(true);
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

    useEffect(() => {
        loadVPI();
    }, []);

    async function addobject() {
        const storageData = {
            groesse,
            extrakosten,
            mietpreis,
        };
        try {
            const response = await fetch('https://localhost:7186/Storage/addobject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();

                if (data) {
                    login(data.accesstoken, data.email);
                    console.log('Login erfolgreich');
                    navigate('/user');
                } else {
                    alert('Login fehlgeschlagen: Kein g�ltiges Token erhalten');
                }
            } else {
                const error = await response.text();
                alert('Login fehlgeschlagen: ' + error);
            }
        } catch (error) {
            console.error('Netzwerkfehler:', error);
        }
    }

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
                            <p>Mietzins alt / Index alt * <input placeholder="Index neu"></input> = Mietzins neu</p>
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
            {showPopupAdd && (
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
                                type="groesse"
                                id="groesse"
                                name="groesse"
                                placeholder="Gr&ouml;&szlig;e in m&sup2;"
                                value={groesse}
                                onChange={(e) => setGroesse(e.target.value)}
                            />
                            <input
                                type="mietpreis"
                                id="mietpreis"
                                name="mietpreis"
                                placeholder="Mietpreis"
                                value={mietpreis}
                                onChange={(e) => setMietpreis(e.target.value)}
                            />
                            <input
                                type="extrakosten"
                                id="extrakosten"
                                name="extrakosten"
                                placeholder="Extrakosten"
                                value={extrakosten}
                                onChange={(e) => setExtrakosten(e.target.value)}
                            />
                            <label>{`${vpi}`}</label>
                            <div className="dropdown">
                                <select >
                                    <option value="">Objekt ausw&auml;hlen</option>
                                    <option value="">Mietobjekt 1</option>
                                    <option value="">Mietobjekt 2</option>
                                </select>
                            </div>
                            <button className="btn-uploadContract">Vertrag hochladen</button>
                            <button className="btn-addObject" onClick={addobject}>Objekt hinzuf&uuml;gen</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
  );
}

export default ObjectActions;