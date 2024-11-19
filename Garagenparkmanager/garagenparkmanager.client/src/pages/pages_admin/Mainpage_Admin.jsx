/* Mainpage_Admin-Component */

import { Link } from 'react-router-dom';
import './Mainpage_Admin.css';
import Header from '../../components/admin_view/Header_Admin';

function Mainpage_Admin() {
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
                            <p>Aktueller Mietzins: XX</p>
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