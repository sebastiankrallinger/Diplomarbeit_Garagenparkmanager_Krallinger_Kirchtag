import React, { useState } from 'react';
import './ObjectActions.css'
import objectImg from '../assets/newsPlaceholder.jpg';

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
                        <h2>Garage Z4 - Details</h2>
                        <img src={objectImg} className="objectImage" alt="Object-Image"></img>
                        <p>Mietzins alt / Index alt * <input placeholder="Index neu"></input> = Mietzins neu</p>
                        <button onClick={closePopupDetails}>&Auml;nderungen Speichern</button>
                    </div>
                </div>
            )}
            {showPopupAdd && (
                <div className="popup-add">
                    <div className="popup-add-content">
                        <h2>Neues Objekt erstellen</h2>
                        <button onClick={closePopupAdd}>Schlie&szlig;en</button>
                    </div>
                </div>
            )}
        </div>
  );
}

export default ObjectActions;