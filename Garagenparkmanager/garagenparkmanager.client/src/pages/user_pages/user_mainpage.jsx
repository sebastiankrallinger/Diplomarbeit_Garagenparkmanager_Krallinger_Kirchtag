import React, { useState } from 'react';
import './user_mainpage.css';
import './popup.css';
import Header from '../../components/Header_User';
import Footer from '../../components/Footer';

function UserMainpage() {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [selectedObject, setSelectedObject] = useState(null);

    const handleOpenPopup = (object) => {
        setSelectedObject(object);
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
        setSelectedObject(null);
    };

    const mockObjects = [
        { id: 1, title: 'Objekt Nr. 1', size: '50m²', price: '500€', rentedSince: '01.01.2023', img: 'src/assets/floorplan1.jpg' },
        { id: 2, title: 'Objekt Nr. 2', size: '70m²', price: '700€', rentedSince: '01.06.2022', img: 'src/assets/floorplan2.jpg' },
        { id: 3, title: 'Objekt Nr. 3', size: '40m²', price: '400€', rentedSince: '01.12.2021', img: 'src/assets/floorplan3.jpg' },
    ];

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
                        {mockObjects.map((object) => (
                            <div
                                key={object.id}
                                className="storageImage"
                                onClick={() => handleOpenPopup(object)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src="src/assets/houseplaceholder.jpg" alt={object.title} />
                                <p>{object.title}</p>
                            </div>
                        ))}
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
                                <p>Größe: {selectedObject.size}</p>
                                <p>Preis: {selectedObject.price}</p>
                                <p>Gemietet seit: {selectedObject.rentedSince}</p>
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
