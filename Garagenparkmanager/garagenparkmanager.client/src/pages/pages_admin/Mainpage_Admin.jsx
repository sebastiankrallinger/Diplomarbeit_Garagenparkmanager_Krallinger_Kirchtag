/* Mainpage_Admin-Component */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Mainpage_Admin.css';
import Header from '../../components/admin_view/Header_Admin';

function Mainpage_Admin() {
    const [allObjects, setAllObjects] = useState(null);
    const [bookedObjects, setBookedObjects] = useState(null);
    const [freeObjects, setFreeObjects] = useState(null);
    const [vpi, setVpi] = useState(null);
    const [earnings, setEarnings] = useState(null);
    const [user, setUser] = useState(null); 

    useEffect(() => {
        loadVPI();
        //loadObjects();
        //loadEarnings();
        loadUser();
    }, []);

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

    async function loadObjects() {
        try {
            const response = await fetch('https://localhost:7186/Storage/allobjects', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            });
            const data = await response.json();
            const objects = data.length;
            setAllObjects(objects);
            const bookedObjects = data.filter(obj => obj.booked === true).length;
            setBookedObjects(booked);
            const freeObjects = data.filter(obj => obj.booked === false).length;
            setFreeObjects(freeObjects);
            
        } catch (error) {
            console.error('Fehler beim Abrufen der Lagerräume:', error);
        }
    }

    async function loadEarnings() {
        try {
            //const response = await fetch('');

        } catch (error) {
            console.error('Fehler beim Abrufen des Umsatzes:', error);
        }
    }

    async function loadUser() {
        try {
            const response = await fetch('https://localhost:7186/User/users', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            });
            const data = await response.json();
            const user = data.filter(u => u.role === 2).length;
            setUser(user);
        } catch (error) {
            console.error('Fehler beim Abrufen der Benutzer:', error);
        }
    }


    return (
        <div className="Mainpage_Admin">
            <Header />
            <main>
                <div className="dashboard">
                    <div className="heading">
                        <h2>Dashboard</h2>
                    </div>
                    <div className="content">
                        <div className="leftCol">
                            <p>Gesamtanzahl Objekte: {allObjects ? `${allObjects}` : '...'}</p>
                            <p>Vermietete Objekte: {bookedObjects ? `${bookedObjects}` : '...'}</p>
                            <p>Freie Objekte: {freeObjects ? `${freeObjects}` : '...'}</p>
                            <p>Aktueller Mietzins: {vpi ? `${vpi} \u20AC` : '...'}</p>
                        </div>
                        <div className="rightCol">
                            <p>Umastz letztes Monat: {earnings ? `${earnings} \u20AC` : '...'}</p>
                            <p>Registrierte Benutzer: {user ? `${user}` : '...'}</p>
                            <p>Standorte: 2</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
  );
}

export default Mainpage_Admin;