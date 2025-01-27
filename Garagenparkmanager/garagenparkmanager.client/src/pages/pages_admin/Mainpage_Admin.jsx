/* Mainpage_Admin-Component */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Mainpage_Admin.css';
import Header from '../../components/admin_view/Header_Admin';

function Mainpage_Admin() {
    const url = "https://garagenparkmanager-webapp-dqgge2apcpethvfs.swedencentral-01.azurewebsites.net/";
    //const url = "https://localhost:7186/";
    const [allObjects, setAllObjects] = useState([]);
    const [bookedObjects, setBookedObjects] = useState([]);
    const [freeObjects, setFreeObjects] = useState([]);
    const [vpi, setVpi] = useState();
    const [earnings, setEarnings] = useState(0);
    const [possibleEarnings, setPossibleEarnings] = useState(0);
    const [user, setUser] = useState(); 

    useEffect(() => {
        loadVPI();
        loadObjects();
        loadUser();
    }, []);

    useEffect(() => {
        if (bookedObjects.length > 0) {
            loadEarnings();
        }
    }, [bookedObjects]);

    useEffect(() => {
        if (freeObjects.length > 0) {
            loadPossibleEarnings();
        }
    }, [freeObjects]);

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

    async function loadObjects() {
        try {
            const response = await fetch(url + 'Storage/allobjects', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`
                }
            });
            const data = await response.json();
            const objects = data.length;
            setAllObjects(objects);
            const bookedObjects = data.filter(obj => obj.booked === true);
            setBookedObjects(bookedObjects);
            const freeObjects = data.filter(obj => obj.booked === false);
            setFreeObjects(freeObjects);
            
        } catch (error) {
            console.error('Fehler beim Abrufen der Lagerraeume:', error);
        }
    }

    async function loadEarnings() {
        try {
            const earnings = bookedObjects.reduce((sum, obj) => {
                return sum + obj.price + obj.activeContract.extraCosts;
            }, 0);
            setEarnings(earnings);

        } catch (error) {
            console.error('Fehler beim Abrufen des Umsatzes:', error);
        }
    }

    async function loadPossibleEarnings() {
        try {
            const possibleEarnings = freeObjects.reduce((sum, obj) => {
                return sum + obj.price;
            }, 0);
            const sum = possibleEarnings + earnings;
            setPossibleEarnings(sum);

        } catch (error) {
            console.error('Fehler beim Abrufen des möglichen Umsatzes:', error);
        }
    }

    async function loadUser() {
        try {
            const response = await fetch(url + 'User/users', {
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
                            <p>Gesamtanzahl Objekte: {allObjects ? `${allObjects}` : '0'}</p>
                            <p>Vermietete Objekte: {bookedObjects ? `${bookedObjects.length}` : '0'}</p>
                            <p>Freie Objekte: {freeObjects ? `${freeObjects.length}` : '0'}</p>
                            <p>Aktueller Mietzins: {vpi ? `${vpi}` : '0'}</p>
                        </div>
                        <div className="rightCol">
                            <p>Umastz letztes Monat: {earnings ? `${earnings} \u20AC` : '0'}</p>
                            <p>M&ouml;glicher Umsatz letztes Monat: {possibleEarnings ? `${possibleEarnings} \u20AC` : '0'}</p>
                            <p>Registrierte Benutzer: {user ? `${user}` : '0'}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
  );
}

export default Mainpage_Admin;