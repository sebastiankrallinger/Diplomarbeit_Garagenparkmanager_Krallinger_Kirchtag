/* Mainpage_Admin-Component */

import { Link } from 'react-router-dom';
import './Mainpage_Admin.css';
import Header from '../../components/Header_Admin';

function Mainpage_Admin() {
    return (
        <div className="Mainpage_Admin">
            <Header />
            <main>
                <div className="dashboard">
                    <h2>Dashboard</h2>
                </div>
            </main>
        </div>
  );
}

export default Mainpage_Admin;