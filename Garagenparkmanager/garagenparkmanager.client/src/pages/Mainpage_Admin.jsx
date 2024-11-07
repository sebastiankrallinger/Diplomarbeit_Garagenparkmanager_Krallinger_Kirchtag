/* Mainpage_Admin-Component */

import { Link } from 'react-router-dom';
import './Mainpage_Admin.css';
import Header from '../components/Header_Admin';

function Mainpage_Admin() {
    return (
        <div className="Mainpage_Admin">
            <Header />
            <main>
                <div class="navigation">
                    <Link to="/admin/usermanagement">
                        <button className="nav-up">Benutzer verwalten</button>
                    </Link>
                    <Link to="/admin/objectmanagement">
                        <button className="nav-up">Objekte verwalten</button>
                    </Link>
                    <Link to="/admin/newsmanagement">
                        <button className="nav-bottom">News verwalten</button>
                    </Link>
                    <Link to="/admin/documentmanagement">
                        <button className="nav-bottom">Dokumente verwalten</button>
                    </Link>
                </div>
            </main>
        </div>
  );
}

export default Mainpage_Admin;