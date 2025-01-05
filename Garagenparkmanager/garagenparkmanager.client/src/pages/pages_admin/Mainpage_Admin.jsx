/* Mainpage_Admin-Component */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Mainpage_Admin.css';
import Header from '../../components/admin_view/Header_Admin';

function Mainpage_Admin() {
    const [vpi, setVpi] = useState(null);

    useEffect(() => {
        loadVPI();
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
                            <p>Gesamtanzahl Objekte: XX</p>
                            <p>Vermietete Objekte: XX</p>
                            <p>Freie Objekte: XX</p>
                            <p>Aktueller Mietzins: {vpi ? `${vpi} \u20AC` : '...'}</p>
                        </div>
                        <div className="rightCol">
                            <p>Umastz letztes Monat: XX</p>
                            <p>Registrierte Benutzer: XX</p>
                            <p>Standorte: 2</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
  );
}

export default Mainpage_Admin;