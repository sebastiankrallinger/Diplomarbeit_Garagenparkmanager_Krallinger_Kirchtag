import React, { useState, useEffect } from 'react';
import './user_mainpage.css';
import './popup.css';
import Header from '../../components/Header_User';
import Footer from '../../components/Footer';

function UserMainpage() {
    const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    //const url = "https://localhost:7186/";
    const [id, setId] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [selectedObject, setSelectedObject] = useState(null);
    const [bookedStorages, setBookedtorages] = useState([]);

    const handleOpenPopup = (object) => {
        setSelectedObject(object);
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
        setSelectedObject(null);
    };

    useEffect(() => {
        fetchId();
    }, []);

    useEffect(() => {
        if (id) {
            fetchStorages();
        }
    }, [id]);

    async function fetchId() {
        try {
            const email = localStorage.getItem('email');
            const response = await fetch(url + `User/getCustomerId/${email}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            const data = await response.text();
            setId(data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Kunden-Liste:', error);
        }
    }

    async function fetchStorages() {
        try {
            const response = await fetch(url + `User/getStorages/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            const data = await response.json();
            setBookedtorages(data);
        } catch (error) {
            console.error('Fehler beim Abrufen der Storages:', error);
        }
    }

    return (
        <div className="user_mainpage">
            <Header />
            <main>
                {/* News an erster Stelle */}
                <section className="news">
                    <h1>News</h1>
                    <div className="newsContainer">
                        <button className="navBtn">&#10094;</button>
                        <div className="newsContent">
                            <p id="newsText">Lorem ipsum dolor sit amet...</p>
                        </div>
                        <button className="navBtn">&#10095;</button>
                    </div>
                </section>

                {/* SelfStorage/Immobilien an zweiter Stelle */}
                <section className="selfStorage">
                    <h1>SelfStorage/Immobilien</h1>
                    <div className="storageImages">
                        {bookedStorages.length > 0 ? (
                            bookedStorages.map((object) => (
                                <div
                                    key={object.id}
                                    className="storageImage"
                                    onClick={() => handleOpenPopup(object)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img src={object.img || "src/assets/houseplaceholder.jpg"} alt={object.name} />
                                    <p>{object.name}</p>
                                </div>
                            ))
                        ) : (
                            <p>Keine SelfStorage/Immobilien verf&uuml;gbar.</p>
                        )}
                    </div>
                </section>

                {/* Unser Team an dritter Stelle */}
                <section className="ueberUns">
                    <h1>Unser Team</h1>
                    <div className="personImages">
                        <div className="personImage">
                            <img src="src/assets/personplaceholder.jpg" alt="Person1" />
                            <div className="text">
                                <p className="name">Person1</p>
                                <p className="role">Funktion</p>
                            </div>
                        </div>
                        <div className="personImage">
                            <img src="src/assets/personplaceholder.jpg" alt="Person2" />
                            <div className="text">
                                <p className="name">Person2</p>
                                <p className="role">Funktion</p>
                            </div>
                        </div>
                        <div className="personImage">
                            <img src="src/assets/personplaceholder.jpg" alt="Person3" />
                            <div className="text">
                                <p className="name">Person3</p>
                                <p className="role">Funktion</p>
                            </div>
                        </div>
                        <div className="personImage">
                            <img src="src/assets/personplaceholder.jpg" alt="Person4" />
                            <div className="text">
                                <p className="name">Person4</p>
                                <p className="role">Funktion</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>


            {isPopupOpen && selectedObject && (
                <div className="popupBackdrop" onClick={handleClosePopup}>
                    <div
                        className="popup"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="popupHeader">
                            <img src="src/assets/logo_Lagerage.png" alt="Logo" />
                            <button className="closeButton" onClick={handleClosePopup}>X</button>
                        </div>

                        <h2>{selectedObject.title}</h2>
                        <div className="popupContent">
                            <img src={selectedObject.img} alt="Grundriss" className="floorplan" />
                            <div className="verticalLine"></div>
                            <div className="details">
                                <p>{selectedObject.name}</p>
                                <p>Objetktyp: {selectedObject.storagetype === 0 ? "Garage" : (selectedObject.storagetype === "1" ? "Kleinlager" : (selectedObject.storagetype === "3" ? "B&uuml;ro" : selectedObject.storagetype))}</p>
                                <p>Gr&ouml;&szlig;e: {selectedObject.roomSize} m&sup2; </p>
                                <p>Preis: {selectedObject.price} &euro;</p>
                                <p>Zusatzkosten: {selectedObject.activeContract.extraCosts} &euro;</p>
                                <h3>Meine Dokumente:</h3>
                                <ul>
                                    <li>Vertrag</li>
                                    <li>Preisberechnung</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default UserMainpage;
