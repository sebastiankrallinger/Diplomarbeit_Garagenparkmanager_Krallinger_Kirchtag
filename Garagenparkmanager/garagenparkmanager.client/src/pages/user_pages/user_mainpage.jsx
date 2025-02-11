import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './user_mainpage.css';
import './popup.css';
import Header from '../../components/Header_User';
import Footer from '../../components/Footer';
import houseplaceholder from '../../../src/assets/houseplaceholder.jpg'
//import personplaceholder from '../../../src/assets/personplaceholder.jpg'
import aboutUs1 from '../../../src/assets/aboutUs1.png'
import aboutUs2 from '../../../src/assets/aboutUs2.png'
import aboutUs3 from '../../../src/assets/aboutUs3.png'
import ParkPlan from '../../../src/assets/garagenparkplan.jpg'

function UserMainpage() {
    const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    //const url = "https://localhost:7186/";
    const [id, setId] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [selectedObject, setSelectedObject] = useState(null);
    const [bookedStorages, setBookedtorages] = useState([]);
    const [news, setNews] = useState([]);
    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

    const handlePrevNews = () => {
        setCurrentNewsIndex((prevIndex) => (prevIndex === 0 ? news.length - 1 : prevIndex - 1));
    };

    const handleNextNews = () => {
        setCurrentNewsIndex((prevIndex) => (prevIndex === news.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        if (news.length > 1) {
            const interval = setInterval(() => {
                setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % news.length);
            }, 10000);

            return () => clearInterval(interval);
        }
    }, [news]);

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
            fetchNews();
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
    async function fetchNews() {
        try {
            const response = await fetch(url + `News/allNews`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accesstoken'),
                },
            });
            const data = await response.json();
            setNews(data);
        } catch (error) {
            console.error('Fehler beim Abrufen der News:', error);
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
                        <button className="navBtn" onClick={handlePrevNews}>&#10094;</button>
                        <div className="newsWrapper">
                            <AnimatePresence mode="wait">
                                {news.length > 0 && (
                                    <motion.div
                                        key={news[currentNewsIndex]?.id || currentNewsIndex}
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.5 }}
                                        className="newsContent"
                                    >
                                        <img src={news[currentNewsIndex].imageUrl} className="newsImage" alt="News" />
                                        <div>
                                            <h2>{news[currentNewsIndex].title}</h2>
                                            <p>{news[currentNewsIndex].content}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <button className="navBtn" onClick={handleNextNews}>&#10095;</button>
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
                                    <img
                                        src={object.imageUrl ? object.imageUrl : houseplaceholder}
                                        className="objectImage"
                                        alt="Object-Image"
                                    />
                                    <p>{object.name}</p>
                                </div>
                            ))
                        ) : (
                            <p>Keine SelfStorage/Immobilien verf&uuml;gbar.</p>
                        )}
                    </div>
                </section>

                <section className="garageparkPlan">
                    <div className="plan">
                        <h1>Garagenpark - &Uuml;bersicht</h1>
                        <img src={ParkPlan} alt="Garagenpark" />
                    </div>
                </section>

                {/* Unser Team an dritter Stelle */}
                <section className="ueberUns">
                    <h1>Unser Team</h1>
                    <div className="personImages">
                        <div className="personImage">
                            <img src={aboutUs1} alt="Person1" />
                            <div className="text">
                                <p className="name">Julija</p>
                                <p className="role">Assistentin der Gesch&auml;ftsleitung/Marketing</p>
                            </div>
                        </div>
                        <div className="personImage">
                            <img src={aboutUs2} alt="Person2" />
                            <div className="text">
                                <p className="name">Alex</p>
                                <p className="role">Gesch&auml;ftsf&uuml;hrer</p>
                            </div>
                        </div>
                        <div className="personImage">
                            <img src={aboutUs3} alt="Person3" />
                            <div className="text">
                                <p className="name">Glemens</p>
                                <p className="role">Gr&uuml;nder</p>
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
                            <img
                                src={selectedObject.imageUrl ? selectedObject.imageUrl : houseplaceholder}
                                className="objectImage"
                                alt="Object-Image"
                            />                            <div className="verticalLine"></div>
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
