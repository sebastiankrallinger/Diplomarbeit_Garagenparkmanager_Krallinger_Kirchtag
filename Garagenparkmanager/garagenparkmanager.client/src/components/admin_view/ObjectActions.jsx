import React, { useState } from 'react';
import './ObjectActions.css'
import objectImg from '../../assets/newsPlaceholder.jpg';
import deleteIcon from '../../assets/deleteicon.png';


function ObjectActions() {
    const [showPopupDetails, setShowPopupDetails] = useState(false);
    const [showPopupAdd, setShowPopupAdd] = useState(false);

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
                            <input placeholder="Gr&ouml;&szlig;e in m&sup2;"></input>
                            <input placeholder="Preis nach VPI"></input>
                            <div className="dropdown">
                                <select >
                                    <option value="">Objekt ausw&auml;hlen</option>
                                    <option value="">Mietobjekt 1</option>
                                    <option value="">Mietobjekt 2</option>
                                </select>
                            </div>
                            <button className="btn-uploadContract">Vertrag hochladen</button>
                            <button className="btn-addObject">Objekt hinzuf&uuml;gen</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
  );
}

export default ObjectActions;